'use strict';

// prettier-ignore

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnDeleteAll = document.querySelector('.workout__btn__container');
const workoutSort = document.querySelector('.workouts__sort');

class App {
    #initialCoords;
    #initialZoom;
    #sorted = false
    #map;
    #mapEvent = {};
    #editEvent = {};
    #workouts = [];
    #markers = L.layerGroup();


    constructor() {
        this.#initialCoords = JSON.parse(localStorage.getItem('lastCoords')) || [-40.1318984, 175.472167];
        this.#initialZoom = JSON.parse(localStorage.getItem('lastZoom')) || 6;

        this._initiateWorkouts();

        this._showInitialView();
        this._getPosition();
        inputType.addEventListener('change', this._toggleElevationField);
        form.addEventListener('submit', this._newWorkout.bind(this));
        this.#map.on('click', this._showForm.bind(this));

        document.addEventListener('keydown', this._hideForm);
        containerWorkouts.addEventListener('click', this._actionHandler.bind(this));
        btnDeleteAll.addEventListener('click', this._deleteAllWorkouts.bind(this));
        workoutSort.addEventListener('click', ev => document.querySelector('.workouts__sort__container').classList.toggle('workouts__sort__container--hidden'));
        workoutSort.addEventListener('click', this._sortHandler.bind(this));
    }

    _showInitialView() {

        this.#map = L.map('map');
        this.#map.setView(this.#initialCoords, this.#initialZoom);
        L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            autoPanOnFocus: true
        }).addTo(this.#map);

        //
        this._renderAllWorkouts();
        this._toggleControlBtns();
    }

    _renderAllWorkouts(sorted = false) {
        this._removeWorkouts();
        if (this.#workouts) {
            const workoutIds = this.#workouts.map(el => el.id);
            workoutIds.forEach(this._renderWorkout.bind(this));
            if (!sorted) {
                workoutIds.forEach(this._renderWorkoutMarker.bind(this));
            }
        }
    }

    _getPosition() {
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {

            alert("Couldn't get your location. Try allowing location" + " detection in your browser.")

        }, {
            enableHighAccuracy: false, timeout: Infinity
        });

    }

    _loadMap(position) {

        const {latitude, longitude} = position.coords;

        this.#initialCoords = [latitude, longitude];
        this.#initialZoom = 13;
        localStorage.setItem('lastCoords', JSON.stringify(this.#initialCoords));
        localStorage.setItem('lastZoom', JSON.stringify(13));
        this.#map.setView(this.#initialCoords, this.#initialZoom, {
            duration: 3, animate: true
        });

        // this.#map.zoomIn(6, { animate: true });
        // this.#map.panTo(this.#initialCoords, { duration: 2, animate: true });

        const currentIconHtml = `
        <div class="user-location">
          <div class="user-location-dot"></div>
        </div>
    `
        const markerCurrentPosition = {
            icon: L.divIcon({
                className: 'my-div-icon', html: currentIconHtml
            }),
        }

        L.marker(this.#initialCoords, markerCurrentPosition).addTo(this.#map);

    }

    _showForm(mapEvent) {
        this.#mapEvent = mapEvent;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm(ev) {

        if (ev.key === 'Escape' || ev.type === 'submit') {
            inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
            inputType.value = 'running';
            form.classList.add('hidden');
        }

    }

    _setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));

    }

    _initiateWorkouts() {
        const storedWorkouts = this._getLocalStorage('workouts');
        if (!storedWorkouts) return;
        this.#workouts = storedWorkouts.map(work => {
            if (work.type === 'Running') return new Running(work.coords, work.distance, work.duration, work.cadence);
            if (work.type === 'Cycling') return new Cycling(work.coords, work.distance, work.duration, work.elevation);
        })

    }

    _getWorkoutById(id) {
        return this.#workouts.find(el => el.id === id) || '';
    }

    _getLocalStorage(key) {
        if (!localStorage.getItem(key)) return;
        return JSON.parse(localStorage.getItem(key));
    }

    _toggleElevationField() {
        if (inputType.value === 'running') {
            inputCadence.parentElement.classList.remove('form__row--hidden');
            inputElevation.parentElement.classList.add('form__row--hidden');
        } else {
            inputCadence.parentElement.classList.add('form__row--hidden');
            inputElevation.parentElement.classList.remove('form__row--hidden');
        }

    }

    _toggleControlBtns() {
        if (this.#workouts.length === 0) {
            btnDeleteAll.classList.add('hidden');
            workoutSort.classList.add('hidden');
        } else {
            btnDeleteAll.classList.remove('hidden');
            workoutSort.classList.remove('hidden');
        }
    }

    _newWorkout(event) {
        event.preventDefault();

        const validInputs = (...inputs) => inputs.every(val => Number.isFinite(val));
        const isPositive = (...inputs) => inputs.every(val => val > 0);

        const coords = Object.values(this.#mapEvent.latlng);
        let workout;
        const type = inputType.value;
        const distance = parseFloat(inputDistance.value);
        const duration = parseInt(inputDuration.value);
        if (type === 'running') {
            const cadence = parseInt(inputCadence.value);
            let validation = validInputs(distance, duration, cadence) && isPositive(distance, duration, cadence);
            if (validation) {
                workout = new Running(coords, distance, duration, cadence)
            } else {
                alert('All values must be positive numbers!')
                return;
            }
        }

        if (type === 'cycling') {
            const elevation = parseInt(inputElevation.value);
            const validation = validInputs(distance, duration, elevation) && isPositive(distance, duration);
            if (validation) {
                workout = new Cycling(coords, distance, duration, elevation);
            } else {
                alert('All values must be positive numbers!')
                return;
            }

        }

        if (this.#editEvent.action === 'edit') {
            this._deleteWorkout(this.#editEvent.editId);
            this.#editEvent = {};
        }
        this.#workouts.push(workout); //Must be first to get workout to array!
        this._renderWorkoutMarker(workout.id);

        this._renderWorkout(workout.id);
        this._setLocalStorage('workouts', this.#workouts);

        this._hideForm(event);
        this._toggleControlBtns();

    }


    _renderWorkoutMarker(id) {
        const workout = this._getWorkoutById(id);

        const markerOptions = {
            autoPanOnFocus: true, riseOnHover: true, riseOffset: 250,
        };

        const popupOptions = function (activity) {
            return L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: activity === 'Running' ? "running-popup" : "cycling-popup"
            });
        };
        const content = workout.type === 'Running' ? `🏃${workout.description}` : `🚴${workout.description}`;
        const marker = L.marker(workout.coords, markerOptions).addTo(this.#map)
            .bindPopup(popupOptions(workout.type)
                .setContent(content))
            .openPopup();

        this.#markers.addLayer(marker);
    }

    _renderWorkout(id) {

        const workout = this._getWorkoutById(id);
        const workoutOptions = {
            running: {
                icon: '🏃', icon2: '🦶🏼', units: 'spm', pace: 'min/km'
            }, cycling: {
                icon: '🚴', icon2: '⛰', units: 'm', speed: 'km/h'
            }

        }
        const distanceIcon = workout.pace ? workoutOptions.running.icon : workoutOptions.cycling.icon;
        const metaData = workout.pace ? workout.cadence : workout.elevation;
        const metaIcon = workout.pace ? workoutOptions.running.icon2 : workoutOptions.cycling.icon2;
        const metaUnits = workout.pace ? workoutOptions.running.units : workoutOptions.cycling.units;
        const data = `
        <li class="workout workout--${workout.type.toLowerCase()}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${distanceIcon}️</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace || workout.speed}</span>
        <span class="workout__unit">${workout.pace ? workoutOptions.running.pace : workoutOptions.cycling.speed}</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">${metaIcon}</span>
        <span class="workout__value">${metaData}</span>
        <span class="workout__unit">${metaUnits}</span>
      </div>
      <div class="workout__controls hidden">
         <div class="workout__details workout__btn workout__btn-edit" data-control-type="edit">
<!--         <span class="workout__icon">✏️</span>-->
         <span class="workout__btn__value">EDIT</span>
       </div>
         <div class="workout__details workout__btn workout__btn-delete" data-control-type="delete">
<!--         <span class="workout__icon">🗑️</span>-->
         <span class="workout__btn__value">DELETE</span>
       </div>
       </div>
    </li>`;
        containerWorkouts.insertAdjacentHTML('afterbegin', data);
    }

    _removeWorkouts() {
        const workoutItems = containerWorkouts.querySelectorAll('.workout');
        workoutItems.forEach(el => containerWorkouts.removeChild(el));
    }

    _actionHandler(event) {
        const workoutElement = event.target.closest('li');
        const workoutControls = workoutElement?.querySelector('.workout__controls');
        const action = event.target.closest('div')?.getAttribute('data-control-type');
        const id = event.target.closest('li')?.getAttribute('data-id');
        if (!id) return;

        const workout = this.#workouts.find(el => el.id === Number(id));

        if (!action) {
            workoutControls.classList.toggle('hidden');
            this._moveToPopup(workout);
        }
        if (action === 'edit') {

            this._editWorkout(Number(id));
        }
        if (action === 'delete') {
            this._deleteWorkout(Number(id));
        }
    }

    _editWorkout(id) {
        const workout = this._getWorkoutById(id);

        this._showForm();
        inputType.value = workout.type.toLowerCase();
        inputDistance.value = workout.distance;
        inputDuration.value = workout.duration;
        this._toggleElevationField();
        workout.type === 'Running' ? inputCadence.value = workout.cadence : inputElevation.value = workout.elevation;
        this.#mapEvent = {};
        this.#mapEvent.latlng = workout.coords; // will be read from mapEvent during newWorkout
        this.#editEvent.action = 'edit';
        this.#editEvent.editId = id;
    }

    _deleteWorkout(id) {
        const workout = this._getWorkoutById(id);
        const workoutListEl = document.querySelector(`[data-id="${id}"]`);

        this.#workouts.splice(this.#workouts.indexOf(workout), 1);
        containerWorkouts.removeChild(workoutListEl);
        if (this.#workouts.length === 0) {
            localStorage.removeItem('workouts');
        } else {
            this._setLocalStorage('workouts', this.#workouts);
        }
        this._deleteWorkoutMarker(workout);
        this._toggleControlBtns();

    }

    _deleteWorkoutMarker(workout) {

        this.#markers.eachLayer(mark => {

            if (mark.getLatLng().lat === workout.coords[0] && mark.getLatLng().lng === workout.coords[1]) {
                this.#markers.removeLayer(mark);
                this.#map.removeLayer(mark);
            }
        })

    }

    _deleteAllWorkouts() {
        const workoutsCopy = this.#workouts.slice();
        workoutsCopy.forEach(workout => this._deleteWorkout(workout.id));
        this._toggleControlBtns();
        return this.#workouts.length === 0;
    }

    _moveToPopup(workout) {
        // _moveToPopup(event) {

        const coords = workout.coords;
        this.#map.panTo(coords, {animate: true, duration: 1});
        workout.click();

    }

    _sortHandler(ev) {
        const searchType = ev.target.closest('span')?.getAttribute('data-sort-type');
        switch (searchType) {
            case 'date':
                this._sortWorkoutsByDate();
                break;
            case 'duration':
                this._sortWorkoutsByDuration();
                console.log('duration');
                break;
            case 'distance':
                this._sortWorkoutsByDistance();
                break;
            case 'type':
                this._sortWorkoutsByType();
                break;
            default:
                return;
        }
    }

    _sortWorkoutsByType() {
        this.#workouts.sort((a, b) => {
            if (this.#sorted) {
                return a.description.charCodeAt(0) - b.description.charCodeAt(0);
            }
            return b.description.charCodeAt(0) - a.description.charCodeAt(0)
        });
        this.#sorted = !this.#sorted;
        this._renderAllWorkouts(true);

    }

    _sortWorkoutsByDate() {
        this.#workouts.sort((a, b) => {
            if (this.#sorted)
                return a.dateISO - b.dateISO;
            return b.dateISO - a.dateISO
        });
        this.#sorted = !this.#sorted;
        this._renderAllWorkouts(true);
    }

    _sortWorkoutsByDistance() {
        this.#workouts.sort((a, b) => {
            if (this.#sorted)
                return a.distance - b.distance;
            return b.distance - a.distance
        });
        this.#sorted = !this.#sorted;
        this._renderAllWorkouts(true);
    }

    _sortWorkoutsByDuration() {
        this.#workouts.sort((a, b) => {
            if (this.#sorted)
                return a.duration - b.duration;
            return b.duration - a.duration
        });
        this.#sorted = !this.#sorted;
        this._renderAllWorkouts(true);
    }


    reset() {
        localStorage.clear();
        location.reload();
    }
}

class Workout {
    id;

    date = new Intl.DateTimeFormat('en-NZ', {
        day: "numeric", month: "long"
    }).format(this.id);
    dateISO = Date.now();
    clicks = 0;

    constructor(coords, distance, duration) {
        this.distance = distance;
        this.duration = duration;
        this.coords = coords;
        this.id = Number(Date.now()) + Math.floor(Math.random() * 255);
    }

    _setDescription(type) {
        this.description = `${type} on ${this.date}`;
    }

    click() {
        this.clicks++;
    }

}

class Running extends Workout {
    /**
     *
     * @param coords array[lat,long]
     * @param distance km
     * @param duration  mins
     * @param cadence steps per minute
     * @param type Running
     */
    type = "Running";

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calculatePace();
        this._setDescription(this.type);

    }

    calculatePace() {

        let [mins, secs] = (this.duration / this.distance).toFixed(2).split('.');
        this.pace = `${mins}:${secs}`;

    }

}

class Cycling extends Workout {
    type = 'Cycling';

    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration);
        this.elevation = elevation;
        this.calculateSpeed();
        this._setDescription(this.type);
    }

    calculateSpeed() {
        this.speed = (this.distance / this.duration * 60).toFixed(1);
    }

}

const app = new App();
// const run1 = new Running();
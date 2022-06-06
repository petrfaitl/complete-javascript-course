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

class App {
    #initialCoords;
    #initialZoom;
    #map;
    #mapEvent;
    #workouts = [];

    constructor() {
        this.#initialCoords = JSON.parse(localStorage.getItem('lastCoords')) || [-40.1318984, 175.472167];
        this.#initialZoom = JSON.parse(localStorage.getItem('lastZoom')) || 6;

        this.#workouts = this._getLocalStorage('workouts') || [];

        this._showInitialView();
        this._getPosition();
        inputType.addEventListener('change', this._toggleElevationField);
        form.addEventListener('submit', this._newWorkout.bind(this));
        this.#map.on('click', this._showForm.bind(this));

        document.addEventListener('keydown', this._hideForm);
        // containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
        containerWorkouts.addEventListener('click', this._actionHandler.bind(this));
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
        if (this.#workouts) {
            this.#workouts.forEach(this._renderWorkoutMarker.bind(this));
            this.#workouts.forEach(this._renderWorkout);
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

    _getLocalStorage(key) {
        if (!localStorage.getItem(key)) return;
        return JSON.parse(localStorage.getItem(key));
    }

    _toggleElevationField() {
        inputCadence.parentElement.classList.toggle('form__row--hidden');
        inputElevation.parentElement.classList.toggle('form__row--hidden');

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


        this.#workouts.push(workout);
        this._renderWorkoutMarker(workout);
        this._renderWorkout(workout);
        this._setLocalStorage('workouts', this.#workouts);

        this._hideForm(event);

    }


    _renderWorkoutMarker(workout) {

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
        L.marker(workout.coords, markerOptions).addTo(this.#map)
            .bindPopup(popupOptions(workout.type)
                .setContent(content))
            .openPopup();

    }

    _actionHandler(event) {
        const action = event.target.closest('div')?.getAttribute('data-control-type');
        const id = event.target.closest('li')?.getAttribute('data-id');
        if (!id) return;

        const selectedWorkout = this.#workouts.find(el => el.id === Number(id));

        if (!action) {
            this._moveToPopup(selectedWorkout);
        }
        if (action === 'edit') {

            console.log('edit workout')
        }
        if (action === 'delete') {
            console.log('delete workout');
        }
    }

    _moveToPopup(workout) {
        // _moveToPopup(event) {


        const coords = workout.coords;
        this.#map.panTo(coords, {animate: true, duration: 1});
        console.log(workout);
        // selectedWorkout.click();


    }

    _renderWorkout(workout) {
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
       <div class="workout__separator" ></div>
         <div class="workout__details workout__edit" data-control-type="edit">
         <span class="workout__icon">✏️</span>
         <span class="workout__value">EDIT</span>
       </div>
         <div class="workout__details workout__delete" data-control-type="delete">
         <span class="workout__icon">🗑️</span>
         <span class="workout__value">DELETE</span>
       </div>
    </li>`;
        containerWorkouts.insertAdjacentHTML('afterbegin', data);
    }

    reset() {
        localStorage.clear();
        if (!localStorage.length) console.log('Local storage has been cleared');
    }
}

class Workout {
    id = Date.now();
    date = new Intl.DateTimeFormat('en-NZ', {
        day: "numeric", month: "long"
    }).format(this.id);

    clicks = 0;

    constructor(coords, distance, duration) {
        this.distance = distance;
        this.duration = duration;
        this.coords = coords;
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
        this.speed = this.distance / this.duration * 60;
    }

}

const app = new App();
// const run1 = new Running();
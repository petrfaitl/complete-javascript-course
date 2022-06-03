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
    #workouts;

    constructor() {
        this.#initialCoords = JSON.parse(localStorage.getItem('lastCoords')) || [-40.1318984, 175.472167];
        this.#initialZoom = JSON.parse(localStorage.getItem('lastZoom')) || 6;

        this._showInitialView();

        this.#workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        this._getPosition();
        inputType.addEventListener('change', this._toggleElevationField);
        form.addEventListener('submit', this._newWorkout.bind(this));
        this.#map.on('click', this._showForm.bind(this));

        document.addEventListener('keydown', this._clearForm);
        containerWorkouts.addEventListener('click', this._targetActivity.bind(this));
    }

    _showInitialView() {

        this.#map = L.map('map')
                     .setView(this.#initialCoords, this.#initialZoom);
        L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            autoPanOnFocus: true
        }).addTo(this.#map);

        // if (this.#workouts) {
        //     this.#workouts.forEach(this._addToMap);
        //     this.#workouts.forEach(this._addToList);
        // }

    }

    _getPosition() {
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {

            alert("Couldn't get your location. Try allowing location" +
                " detection in your browser.")

        }, {
            enableHighAccuracy: false, timeout: Infinity
        });

    }

    _loadMap(position) {

        const { latitude, longitude } = position.coords;

        this.#initialCoords = [latitude, longitude];
        this.#initialZoom = 13;
        localStorage.setItem('lastCoords', JSON.stringify(this.#initialCoords));
        localStorage.setItem('lastZoom', JSON.stringify(13));
        this.#map.setView(this.#initialCoords, this.#initialZoom, {
            duration: 3,
            animate: true
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
                className: 'my-div-icon',
                html: currentIconHtml
            }),
        }

        L.marker(this.#initialCoords, markerCurrentPosition).addTo(this.#map);

    }

    _showForm(mapEvent) {
        this.#mapEvent = mapEvent;
        form.classList.remove('hidden');
        inputDistance.focus();

    }

    _clearForm(ev) {
        // console.log(ev);

        if (ev.key === 'Escape' || ev.key === 'Enter') {
            inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
            inputType.value = 'running';
            form.classList.add('hidden');
        }

    }

    _toggleElevationField() {
        inputCadence.parentElement.classList.toggle('form__row--hidden');
        inputElevation.parentElement.classList.toggle('form__row--hidden');

    }

    _newWorkout(event) {
        event.preventDefault();
        const workout = {};
        workout.coords = Object.values(this.#mapEvent.latlng);

        workout.type = inputType.value;
        workout.distance = Number.parseFloat(inputDistance.value);
        workout.duration = Number.parseFloat(inputDuration.value);
        workout.cadence = Number.parseFloat(inputCadence.value);
        workout.elevation = Number.parseFloat(inputElevation.value);
        const today = new Date();

        workout.activityDate = new Intl.DateTimeFormat('en-NZ', { dateStyle: 'long' }).format(today);
        workout.description = `${workout.cadence ? '🏃' : '🚵‍️'} ${workout.type[0].toUpperCase()
                                                                                   .concat(workout.type.substring(1))} on ${workout.activityDate}`
        workout.pace = (workout.duration / workout.distance).toFixed(1);
        workout.id = Date.now();
        workout.clicks = 0;

        this._addToMap(workout);
        this.#workouts.push(workout);
        this._addToList(workout);
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));

        this._clearForm(event);

    }

    _addToMap(workout) {
        const markerOptions = {
            autoPanOnFocus: true, riseOnHover: true, riseOffset: 250,
        };

        const popupOptions = function (activity) {
            return L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: activity === 'running' ? "running-popup" : "cycling-popup"
            });
        };
        L.marker(workout.coords, markerOptions).addTo(this.#map)
         .bindPopup(popupOptions(workout.type)
             .setContent(workout.description))
         .openPopup();

    }

    _targetActivity(event) {

        const id = event.target.closest('li')?.getAttribute('data-id');
        if (!id) return;
        const selectedWorkout = this.#workouts.find(el => el.id === Number(id));
        const coords = selectedWorkout.coords;
        this.#map.panTo(coords, { animate: true, duration: 1 });

    }

    _addToList(workout) {
        const icons = {
            running: {
                icon: '🏃',
                icon2: '🦶🏼',
                units: 'spm'
            },
            cycling: {
                icon: '🚴',
                icon2: '⛰',
                units: 'm'
            }

        }
        const distanceIcon = workout.cadence ? icons.running.icon : icons.cycling.icon;
        const metaData = workout.cadence ? workout.cadence : workout.elevation;
        const metaIcon = workout.cadence ? icons.running.icon2 : icons.cycling.icon2;
        const metaUnits = workout.cadence ? icons.running.units : icons.cycling.units;
        const data = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description.substring(2)}</h2>
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
        <span class="workout__value">${workout.pace}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">${metaIcon}</span>
        <span class="workout__value">${metaData}</span>
        <span class="workout__unit">${metaUnits}</span>
      </div>
    </li>`;
        containerWorkouts.insertAdjacentHTML('afterbegin', data);

    }
}

class Workout {
    constructor(distance, duration) {
        this.id = Date.now();
        this.distance = distance;
        this.duration = duration;
    }

}

class Running extends Workout {
    constructor(distance, duration, cadence, type = 'running') {
        super(distance, duration);
        this.cadence = cadence;
        this.type = type;
    }

}

class Cycling extends Workout {
    constructor(distance, duration, elevation, type = 'cycling') {
        super(distance, duration);
        this.elevation = elevation;
        this.type = type;
    }

}

const app = new App();
const run1 = new Running(3, 25, 180);
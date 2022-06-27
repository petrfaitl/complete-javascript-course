'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function lesson249() {
    const getCountryData = function (country) {
        const url = 'https://restcountries.com/v3.1';
        const countryStr = `/name/${country}`;

        const request = new XMLHttpRequest();
        request.open('GET', url + countryStr);
        request.send();
        request.addEventListener('load', function () {
            const [data] = JSON.parse(this.responseText);
            const languages = Object.entries(data.languages);
            // console.log(languages);
            // console.log(data);
            const html = `<article class="country">
        <img class="country__img" src="${data.flags.svg}"/>
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}mil people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)
                                                           .join(', ')}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)
                                                          .map(el => el.name)
                                                          .join(', ')}</p>
        </div>
    </article>`;

            countriesContainer.insertAdjacentHTML('afterbegin', html);
            countriesContainer.style.opacity = 1;
        })
    }


    getCountryData('new zealand');
    getCountryData('czech republic');
    getCountryData('australia');
}

// lesson249();

function lesson250() {

    const renderCountry = function (data, className = '') {
        const html = `<article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}"/>
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}mil people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)
                                                           .join(', ')}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)
                                                          .map(el => el.name)
                                                          .join(', ')}</p>
        </div>
    </article>`;
        countriesContainer.insertAdjacentHTML('afterbegin', html);
        countriesContainer.style.opacity = 1;

    }
    const getCountryandNeighbour = function (country) {
        const url = 'https://restcountries.com/v3.1';
        const countryStr = `/name/${country}`;

        const request = new XMLHttpRequest();
        request.open('GET', url + countryStr);
        request.send();
        request.addEventListener('load', function () {
            const [data] = JSON.parse(this.responseText);
            const languages = Object.entries(data.languages);
            // console.log(languages);
            console.log(data);

            // render country 1
            renderCountry(data);
            const [neighbour] = data.borders;
            console.log()
            if (!neighbour) return;

            // Get neighbour country
            const countryStr = `/alpha/${neighbour}`;
            const request = new XMLHttpRequest();
            request.open('GET', url + countryStr);
            request.send();
            request.addEventListener('load', function () {
                const [data] = JSON.parse(this.responseText);
                const languages = Object.entries(data.languages);
                // console.log(languages);
                console.log(data);
                renderCountry(data, 'neighbour');
            });
        });
    }


    getCountryandNeighbour('usa');

}

// lesson250();
function lesson251() {

    const renderCountry = function (data, className = '') {
        const html = `<article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}"/>
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}mil people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)
                                                           .join(', ')}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)
                                                          .map(el => el.name)
                                                          .join(', ')}</p>
        </div>
    </article>`;
        countriesContainer.insertAdjacentHTML('afterbegin', html);
        countriesContainer.style.opacity = 1;

    }


    const getCountryData = function (country) {

        const url = 'https://restcountries.com/v3.1';
        const countryStr = `/name/${country}`;
        // need to return json Object which is also a promise, hence another .then
        fetch(url + countryStr)
            .then(response => response.json())
            .then(data => renderCountry(data[0]));
    }

    getCountryData('czech republic');

}

// lesson251();

function lesson252() {

    const renderCountry = function (data, className = '') {
        const html = `<article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}"/>
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}mil people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)
                                                           .join(', ')}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)
                                                          .map(el => el.name)
                                                          .join(', ')}</p>
        </div>
    </article>`;
        countriesContainer.insertAdjacentHTML('beforeend', html);

    }
    const renderError = function (msg) {
        countriesContainer.insertAdjacentText('beforeend', msg);
    }

    const getCountryData = function (country) {

        const url = 'https://restcountries.com/v3.1';
        const countryStr = `/name/${country}`;

        // need to return json Object which is also a promise, hence another .then


        fetch(url + countryStr)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`No country called ${country}. `);

                }
                return response.json();
            })

            .then(data => {
                renderCountry(data[0]);
                const code = data[0].borders[0];
                const neighbour = `/alpha/${code}`;
                if (!neighbour) return;
                return fetch(url + neighbour);
            })
            .then(response => response.json())
            .then(data => renderCountry(data[0], 'neighbour'))
            .catch(e => {
                renderError(`Something went wrong. ${e.message}`);

            })
            .finally(() => {
                countriesContainer.style.opacity = 1;
            });

    }


    btn.addEventListener('click', () => getCountryData('australia'));

}

// lesson252();

function lesson253() {

    const renderCountry = function (data, className = '') {
        const repeatCall = countriesContainer.querySelectorAll('.country').length;
        if (repeatCall > 1) {
            countriesContainer.innerHTML = '';
        }

        const html = `<article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}"/>
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}mil people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)
                                                           .join(', ')}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)
                                                          .map(el => el.name)
                                                          .join(', ')}</p>
        </div>
    </article>`;
        countriesContainer.insertAdjacentHTML('beforeend', html);

    }
    const renderError = function (msg) {
        const html = `<div class="neighbour__err">${msg}</div>`
        countriesContainer.insertAdjacentHTML('beforeend', html);
    }

    const fetchJSON = function (url, errMsg) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${errMsg} ${country}. `);

                }
                return response.json();
            })

    }

    const getCountryData = function (country) {

        const url = 'https://restcountries.com/v3.1';
        const countryStr = `/name/${country}`;

        // need to return json Object which is also a promise, hence another .then

        fetchJSON(url + countryStr, 'No country called')
            .then(data => {
                renderCountry(data[0]);
                console.log(data[0])
                const code = data[0].borders?.[0];
                if (!code) {
                    throw new Error('No neighbour found.');
                }
                const neighbour = `/alpha/${code}`;

                return fetchJSON(url + neighbour, 'No neighbour.');
            })
            .then(data => renderCountry(data[0], 'neighbour'))
            .catch(e => {
                renderError(`${e.message}`);

            })
            .finally(() => {
                countriesContainer.style.opacity = 1;
            });

    }


    btn.addEventListener('click', () => getCountryData('netherlands'));

}

// lesson253();
// js timers are not good for precise measurements as they are put on teh callback queue that has lower priority than
// micro-task queue. Therefore, they might not fire at time specified.
function lesson258() {
    setTimeout(_ => console.log("Timer started"), 0);
    console.log("test start");
    Promise.resolve('Promise resolved')
           .then(res => console.log(res))
           .finally(_ => {
               console.log("test stopped")
           });


}

// lesson258();
function lesson259() {
    const lotteryPromise = new Promise(function (resolve, reject) {
        console.log('Lottery is being drawn 🔮')

        setTimeout(function () {
            if (Math.random() >= 0.5) {
                resolve('You win 🏆');
            } else {
                reject(new Error('You lost your money 💩'));
            }

        }, 2000);
    });
    lotteryPromise.then(res => console.log(res))
                  .catch(err => console.error(err.message));

    // Promisifying setTimeout
    const wait = function (seconds) {
        return new Promise(function (resolve) {
            setTimeout(() => {
                resolve(seconds)
            }, seconds * 1000);

        });
    };

    wait(2)
        .then((res) => {
            console.log(`I waited for ${res} secs`);
            return wait(3);
        })
        .then((res) => console.log(`I waited for ${res} secs`));
}

// lesson259();
function lesson260() {
    const renderCountry = function (data, className = '') {
        const repeatCall = countriesContainer.querySelectorAll('.country').length;
        if (repeatCall > 1) {
            countriesContainer.innerHTML = '';
        }

        const html = `<article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}"/>
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}mil people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)
                                                           .join(', ')}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)
                                                          .map(el => el.name)
                                                          .join(', ')}</p>
        </div>
    </article>`;
        countriesContainer.insertAdjacentHTML('beforeend', html);

    }

    const fetchJSON = async function (url) {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Problem getting data');
        }

        return response.json();

    }


    const getCurrentCoords = function () {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(success => {
                resolve(success.coords);
            });
        })
    }

    const getCountryData = async function () {
        let city;
        let country;
        try {


            // Obtain coordinates
            const coords = await getCurrentCoords();

            // Get Location data from https://geocode.xyz/api
            const dataGeo = await fetch(`https://geocode.xyz/${coords.latitude},${coords.longitude}?json=1`);
            const geoResult = await dataGeo.json();

            city = geoResult.city;
            country = geoResult.country;

            // Get country flag and other data from Rest Country
            const url = 'https://restcountries.com/v3.1';
            const countryStr = `/name/${country}`;
            const data = await fetchJSON(url + countryStr);
            renderCountry(data[0]);
            // Getting neighbour countries
            // const code = data[0].borders?.[0];
            // if (!code) {
            //     throw new Error('No neighbour found.');
            // }
            // const neighbour = `/alpha/${code}`;
            //
            // const neighbourRes = await fetchJSON(url + neighbour);
            // renderCountry(neighbourRes[0], 'neighbour');


        } catch (e) {
            console.log(e);
        } finally {
            countriesContainer.style.opacity = 1;
            return `You are now in ${city}, ${country}`;

        }
    }
    // btn.addEventListener('click', () => getCountryData());
    console.log(`1: Starting to get location`);

    (async function () {
        try {
            const result = await getCountryData();
            console.log(`2: ${result}`);
        } catch (e) {
            console.log(e.message);
        } finally {
            console.log(`3: Finished getting Location`);

        }
    })();
}

// lesson260();


function lesson265() {
    const fetchJSON = async function (url) {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Problem getting data');
        }

        return response.json();

    }
    const get3Countries = async function (c1, c2, c3) {
        try {
            // const [data1] = await fetchJSON(`https://restcountries.com/v3.1/name/${c1}`)
            // const [data2] = await fetchJSON(`https://restcountries.com/v3.1/name/${c2}`)
            // const [data3] = await fetchJSON(`https://restcountries.com/v3.1/name/${c3}`)

            const data = await Promise.all([fetchJSON(`https://restcountries.com/v3.1/name/${c1}`), fetchJSON(`https://restcountries.com/v3.1/name/${c2}`), fetchJSON(`https://restcountries.com/v3.1/name/${c3}`)]);
            console.log(data.map(el => el[0].capital[0])
                            .join(', '));
        } catch (e) {
            console.log(e);
        } finally {
            countriesContainer.style.opacity = 1;

        }
    }

    get3Countries('new zealand', 'congo', 'italy');

}

// lesson265();

function lesson266() {


}
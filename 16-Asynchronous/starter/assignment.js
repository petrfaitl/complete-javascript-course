'use strict';
const countriesContainer2 = document.querySelector('.countries');
const btnWhereAmI = document.querySelector('.btn-country');

const renderLoader = function () {
    const loader = `
    <div class="loader"</div>
    `;
    countriesContainer2.style.opacity = 1;
    countriesContainer2.insertAdjacentHTML('beforeend', loader);
}

const getPosition = function () {
    renderLoader();
    // navigator.geolocation.getCurrentPosition(pos => {
    //     const { latitude, longitude } = pos.coords;
    //     whereAmI(latitude, longitude);
    //
    // }, err => 'cannot obtain location', { timeout: Infinity });
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

const getGeo = function () {
    getPosition()
        .then(position => {
            console.log(position)
            const {latitude, longitude} = position.coords;
            whereAmI(latitude, longitude);
        })
        .catch(err => console.log(err));
}
// getGeo();

const renderCountry = function (country, place) {
    const {
        flags: {svg: flag}, name: {common: countryName}, region, population, languages, currencies
    } = country;

    // console.log(flag, countryName, region, population, languages, currencies);

    const html = `
     <article class="country">
                    <img class="country__img" alt="flag" src="${flag}"/>
                    <div class="country__data">
                        <h3 class="country__name">${countryName}</h3>
                        <h4 class="country__region">${region}, <span class="country__city">${place}</span></h4>
                        <p class="country__row"><span>👫</span>${(population / 1000000).toFixed(2)}mil</p>
                        <p class="country__row"><span>🗣️</span>${Object.values(languages)
                                                                       .join(', ')}</p>
                        <p class="country__row"><span>💰</span>${Object.values(currencies)
                                                                      .map(cur => cur.name)
                                                                      .join(', ')}</p>
                    </div>
                </article>
    `
    countriesContainer2.insertAdjacentHTML('beforeend', html);

}

const getIpGeo = function () {
    renderLoader();
    const ipjsontestUrl = 'http://ip.jsontest.com';
    const ipapiUrl = 'http://ip-api.com/json'

    fetch(ipapiUrl)
        .then(response => response.json())
        .then(data => {
            whereAmI(data.lat, data.lon);
        })
}

const whereAmI = function (latitude, longitude) {

    const geoUrl = 'https://geocode.xyz/';
    const outputFormat = 'json=1';
    const restCountriesUrl = `https://restcountries.com/v3.1/name/`;

    fetch(`${geoUrl}${latitude},${longitude}?${outputFormat}`,)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            fetch(`${restCountriesUrl}${data.country}`)
                .then(response => response.json())
                .then(d => {
                    const {city} = data;
                    // console.log(d[0]);
                    renderCountry(d[0], city);
                })
                .finally(_ => {
                    const spinner = document.querySelector('.loader');
                    spinner.parentNode.removeChild(spinner);
                })
        })
        .catch(err => {

        })

}

// btnWhereAmI.addEventListener('click', getGeo);
// btnWhereAmI.addEventListener('click', getIpGeo);


/**
 * Assignment Async
 *
 */


// let image = document.createElement('img');
// image.src = 'img/img-1.jpg';
// const imgContainer = document.querySelector('.images');
//
// image.addEventListener('load', function (e) {
//     imgContainer.append(image);
// })
//
//
// const setImage = function (imageUrl) {
//     return new Promise(function (resolve, reject) {
//
//
//         let image = document.createElement('img');
//         image.classList.add('fade-in');
//
//         image.addEventListener('load', function (e) {
//             // console.log("event ", e);
//             resolve(image);
//         });
//         image.addEventListener('error', function (e) {
//             // console.log(e);
//             reject(new Error('Image not found. Check image file.'));
//
//         });
//         try {
//             image.src = imageUrl;
//         } catch (e) {
//             console.log(e);
//             // throw new Error("Image not found. Check image file.");
//
//         }
//
//     });
// }
//
// const removeChildImg = function (parent) {
//     const child = parent.querySelector('img');
//     parent.removeChild(child);
// }
// const loadImage = function (url) {
//     setImage(url)
//         .then(response => {
//             const imgContainer = document.querySelector('.images');
//             const notEmpty = imgContainer.hasChildNodes();
//             if (notEmpty) {
//                 removeChildImg(imgContainer);
//             }
//             imgContainer.appendChild(response);
//         })
//         .catch(err => console.error(err));
//
//
// }
//
// loadImage("");

// const wait = function (seconds) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, seconds * 1000);
//     })
// }
//
// wait(2)
//     .then(_ => {
//         loadImage('img/img-1.jpg');
//         return wait(2);
//     })
//     .then(_ => {
//         loadImage('img/img-2.jpg');
//         return wait(2);
//     })
//     .then(_ => {
//         loadImage('img/img-3.jpg');
//         return wait(2);
//     })
//     .then(_ => {
//         removeChildImg(document.querySelector('.images'));
//     });

const imgContainer = document.querySelector('.images');
const loadImage = function (imageUrl) {
    return new Promise((resolve, reject) => {
        const newImage = new Image();
        newImage.classList.add('fade-in', 'parallel');
        try {
            newImage.src = imageUrl;
        } catch (error) {
            console.log(error);
            throw new Error('No image at given url. Check path.');
        }

        newImage.onload = () => resolve(newImage);
        newImage.addEventListener('error', () => {
            reject(new Error('Image not available.'));
        });


    });

}
const wait = function (secs) {
    return new Promise((resolve) => {
        setTimeout(_ => {
            resolve();
        }, secs * 1000);
    });
}

const replaceImage = function (image) {

    const child = imgContainer.querySelector('img');
    if (child)
        imgContainer.removeChild(child);
    imgContainer.appendChild(image);
}

const loadNPause = async function () {
    try {
        let image = await loadImage('img/img-1.jpg');
        console.log('image 1');
        replaceImage(image);
        await wait(2);

        image = await loadImage('img/img-2.jpg');
        console.log('image 2');
        replaceImage(image);
        await wait(2);

        image = await loadImage('img/img-3.jpg');
        console.log('image 3');
        replaceImage(image);
        await wait(2);

    } catch (e) {
        console.log(e);

    }
}

// loadNPause();

const imageUrls = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

const loadAll = async function (arr) {
    try {
        const allImages = arr.map(await loadImage);
        const imgsEl = await Promise.allSettled(allImages);
        console.log(imgsEl);
        for (let img of imgsEl) {
            imgContainer.appendChild(img);
            await wait(2);
        }
    } catch (e) {
        console.log(e);
    }

}
loadAll(imageUrls);

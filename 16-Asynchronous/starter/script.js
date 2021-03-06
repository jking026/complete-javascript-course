'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

/*
//AJAX call country 1
const getCountryAndNeighbor = function (country) {
  // older version
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  console.log(request.responseText);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbor country
    const [neighbor] = data.borders;

    if (!neighbor) return;

    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbor');
    });
  });
};
getCountryAndNeighbor('USA');

// CALLBACK HELL === BUGS, TRIANGULAR SHAPE, HARD TO UNDERSTAND
setTimeout(() => {
  console.log('1 second has passed');
  setTimeout(() => {
    console.log('2 seconds has passed');
    setTimeout(() => {
      console.log('3 seconds has passed');
      setTimeout(() => {
        console.log('4 seconds has passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();
//   console.log(request.responseText);

// Proper way to get APIs
// const request = fetch('https://restcountries.eu/rest/v2/name/usa'); // Promise
// console.log(request);

//  LESSON: CONSUMING PROMISES

// const getCOuntryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       //json will => a new promise
//       return response.json();
//     })
//     .then(function (data)` {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };-
/*
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
*/
// // LESSON: CHAINING PROMISES
// const getCOuntryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbor = data[0].borders[0];
//       const neighbor = 'lkjlkjlkj';

//       if (!neighbor) return;
//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbor'))
//     .catch(err => {
//       console.error(`${err}💥💥💥💥`);
//       renderError(`Something went wrong 💣💣 ${err.message}.  Try again!`);
//     })

//     //used for hiding a loading spinner
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
/*
// LESSON: CHAINING PROMISES
const getCOuntryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      // const neighbor = 'lkjlkjlkj';

      if (!neighbor) throw new Error('No neighbor found!');

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbor}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data, 'neighbor'))
    .catch(err => {
      console.error(`${err}💥💥💥💥`);
      renderError(`Something went wrong 💣💣 ${err.message}.  Try again!`);
    })

    //used for hiding a loading spinner
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCOuntryData('usa');
});

// getCOuntryData('USA');
// getCOuntryData('mexico');

// getCOuntryData('Australia'); // No neighbors error
*/
/*
/////////////////////////////CODING CHALLENGE #1///////////////////////
//USING MULTIPLE API'S TO FIND THE LOCATION USING LATITUDE AND LONGITUDE
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below).

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`ERROR ${res.status}, please slow down!`);
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}!`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`Something went wrong  ${err.message}`));
};
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
*/
////////////////////////// CODING CHALLENGE #1 COMPLETE///////////////
/*
// LESSON: BUILDING A SIMPLE PROMISE
console.log('Test start');
setTimeout(() => console.log('0 sec timer '), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 100000000; i++) {}
  console.log(res);
});

console.log('Test end ');
*/

/*
///////////////////////////USE FOR CC #2//////////////////////////
// LESSON: BUILDING A SIMPLE PROMISE

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('YOU WIN 🤑');
    } else {
      reject(new Error('YOU LOST YOUR MONEY 😖'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// to promisify setTimrout

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('I waited for 1 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 3 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 4 second'));

// setTimeout(() => {
//   console.log('1 second has passed');
//   setTimeout(() => {
//     console.log('2 seconds has passed');
//     setTimeout(() => {
//       console.log('3 seconds has passed');
//       setTimeout(() => {
//         console.log('4 seconds has passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// created an immediate fulfilled promise

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem 🙀')).catch(x => console.error(x));
*/
/*
// LESSON: PROMISIFYING THE GEOLOCATION API

const getCurrentPosition = function () {
  return new Promise(function (resolve, reject) {
    //* automatically will call resolve and reject, so it can be simplified
    //   navigator.geolocation.getCurrentPosition(
    //     position => resolve(position),
    //     err => reject(err)
    //   );

    //simple version
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getCurrentPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getCurrentPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log(pos.coords);

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`ERROR ${res.status}, please slow down!`);
      return res.json();
    })
    .then(data => {
      console.log(data.country);

      console.log(`You are in ${data.city}, ${data.country}!`);
      console.log(data);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`Something went wrong  ${err.message}`));
};

btn.addEventListener('click', whereAmI);
*/
/*
///////////////////////////// CC#2 ////////////////////////////////////
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};
let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 3 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/
////////////////////////////// CC #2 COMPLETE ///////////////////////
/*
// LESSON: CONSUMING PROMISES WITH ASYNC/AWAIT

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    //* automatically will call resolve and reject, so it can be simplified
    //   navigator.geolocation.getPosition(
    //     position => resolve(position),
    //     err => reject(err)
    //   );

    //simple version
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// await will stop the function until the promise is fulfilled
// fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res =>
//   console.log(res)

const whereAmI = async function () {
  // LESSON: ERR HANDLING WITH TRY...CATCH METHOD
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    //Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${dataGeo.state}`
    );
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();

    renderCountry(data);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💩`);
    renderError(`💩 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);

console.log('First');

// // Older way to return data using async
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💩`))
//   .finally(() => console.log('3: Finished getting location'));

// Better way when using async & await functions
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💩`);
  }
  console.log('3: Finished getting location');
})();

//example 1
//try + catch
// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }
*/
/*
// RUNNING PROMISES IN PARALLEL (promise.all combinator)

const get3countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );

    // console.log([data1.capital, data2.capital, data3.capital]);

    //Promise.all() short circuits if one fails
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3countries('portugal', 'usa', 'tanzania');

*/

// Promise.race recieves and [] of promises and returns a promise

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//     getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
//     getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();
/*
// LESSON: OTHER PROMISE COMBINATORS: RACE, ALLSETTLED & ANY
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request was too long!'));
    }, sec * 1000);
  });
};

Promise.race(
  [getJSON(`https://restcountries.eu/rest/v2/name/mexico`)],
  timeout(5)
)
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// PROMISE.allSettled

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promis.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/

////////////////////////// CODING CHALLENGE #3 //////////////////////

// PART 1
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time using async/await (only the part where the promise is consumed, reuse the  'createImage' function from before)

// 2. Compare the two versions, think about the big differences, and see which one you like more

// 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
// in the dev tools Network tab

// wait function for transitions between photos
const wait = async function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

//change opacity to 'none'
const nextImg = function (img) {
  img = img.style.display = 'none';
};

// const wait = function resolveAfterSeconds(sec) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('It is done!');
//     }, sec * 1000);
//   });
// };

// ViewPort for images
const imgContainer = document.querySelector('.images');

const createImage = async function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// First attempt and successful to pass a function for opacity = 'none'

// Part 1
// async function loadNPause() {
//   console.log('🔃-Loading ...');
//   try {
//     let img1 = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(2);
//     nextImg(img1);
//     let img2 = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(2);
//     nextImg(img2);
//     let img3 = await createImage('img/img-3.jpg');
//     console.log('Image 3 loaded');
//     await wait(2);
//     nextImg(img3);
//   } catch {
//     err => console.error(err);
//   }
// }
// loadNPause();

// First attempt without help
// const loadAll = async function (imgArr) {
//   await Promise.all(imgArr.map(imgs => createImage(imgs)));
// };
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// Video solution

// const loadNPause = async function () {
//   try {
//     //Load image 1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     //Load image 2
//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     //Load image 3
//     img = await createImage('img/img-3.jpg');
//     console.log('Image 3 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.log(err);
//   }
// };
// loadNPause();

// Part 2-(video solution)

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    const imgEl = await Promise.all(imgs);
    console.log(imgEl);
    imgEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

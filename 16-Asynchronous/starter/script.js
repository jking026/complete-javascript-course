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
    console.log(dataGeo);

    //Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${dataGeo.state}`
    );
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();

    renderCountry(data);
  } catch (err) {
    console.error(err);
    renderError(`💩 ${err.message}`);
  }
};
whereAmI();

console.log('First');

//try + catch
// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

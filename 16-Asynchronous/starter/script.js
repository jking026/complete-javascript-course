'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// LESSON: FIRST AJAX CALL: XMLHttpRequest

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};
// LESSON: HANDLING REJECTED PROMISES
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
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
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

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

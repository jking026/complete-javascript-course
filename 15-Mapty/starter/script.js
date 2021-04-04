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

let map, mapEvent;

// LESSON:"USING THE GEOLOCATION API"
navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(
      `https://www.google.com/maps/search/maps/@${latitude}, ${longitude}`
    );

    const coords = [latitude, longitude];
    // first param = latitude, longitude/ second param = zoom level
    //can add an event listener to the map variable from Leaflet
    map = L.map('map').setView(coords, 13);
    // can change tiles image style
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Handling clicks on map
    map.on('click', function (mapE) {
      mapEvent = mapE;
      form.classList.remove('hidden');
      //.focus() allows the cursor to focus on that form field
      inputDistance.focus();
    });
  },
  function () {
    alert('Could not get your position');
  }
);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  // Clear input fields
  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.valuen =
    '';
  // Diplay marker

  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        // API reference from leaflet
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

// LESSON: "RENDERING WORKOUT INPUT FORM"
inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});

'use strict';

// // LESSON: CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR

// const Person = function (firstName, birthYEar) {
//   this.firstName = firstName;
//   this.birthYEar = birthYEar;

//   // NEVER CREATE A METHOD INSIDE A CONSTRUCTOR FUNCTION // REPETITIVE
//   // this.calcAge = function () {
//   //   console.log(2037 - this.birthYEar);
//   // };
// };

// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// /* NEW: has 4 fundamental steps  */
// // 1. New empty object {} is created
// // 2. function is called, this = {}
// // 3. {} linked to prototype
// // 4. function automatically return {}

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);
// console.log(matilda, jack);

// const jay = 'Jay';
// console.log(jay instanceof Person);
// // Checks fi the prototype property of a constructor
// console.log(jonas instanceof Person);

// // LESSON: PROTOTYPES
// console.log(Person.prototype);
// // 1. Each and every function has property called 'prototype'
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYEar);
// };

// jonas.calcAge();
// matilda.calcAge();
// // Checks what prototype chain
// console.log(jonas.__proto__);
// console.log(jonas.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

// //  More like === .prototypeOfLinkedObjects

// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas, matilda, matilda.species);

// console.log(jonas.hasOwnProperty('firstName')); // true

// // => false because jonas does not have a direct species property like firstName
// console.log(jonas.hasOwnProperty('species')); //  false

// // LESSON: PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS
// console.log(jonas.__proto__);
// // Object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__); // null

// console.dir(Person.prototype.constructor);

// const arr = [3, 6, 6, 2, 7, 9, 1, 9, 1, 1]; // new array === []
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// console.log(arr.__proto__.__proto__);

// /* NOT GOOD PRACTICE*/
// // Created a new prototype that all [] have
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// console.log(arr.unique());

// const h1 = document.querySelector('h1');

// console.dir(x => x + 1);

/////////////// LESSON: CODING CHALLENGE #1/////////////////////////////

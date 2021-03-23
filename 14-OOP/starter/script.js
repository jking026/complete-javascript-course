'use strict';

// LESSON: CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR

const Person = function (firstName, birthYEar) {
  this.firstName = firstName;
  this.birthYEar = birthYEar;

  // NEVER CREATE A METHOD INSIDE A CONSTRUCTOR FUNCTION // REPETITIVE
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYEar);
  // };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);
/* NEW: has 4 fundamental steps  */
// 1. New empty object {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

const jay = 'Jay';
console.log(jay instanceof Person);
// Checks fi the prototype property of a constructor
console.log(jonas instanceof Person);

// LESSON: PROTOTYPES

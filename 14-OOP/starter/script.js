'use strict';

// // LESSON: CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR

// const Person = function (firstName, birthYEar) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;

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

// Person.hey = function () {
//   console.log('Hey there 🙋‍♀️');
//   console.log(this);
// };
// Person.hey();
// ////////////////////////////////////////////////////
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
// /*
// /////////////// LESSON: CODING CHALLENGE #1/////////////////////////////

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`'${this.make}' is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`'${this.make}' is going at ${this.speed} km/h`);
// };
// bmw.brake();
// mercedes.brake();
// bmw.accelerate();
// mercedes.accelerate();

// //Test data:
// // § Data car 1: 'BMW' going at 120 km/h
// // § Data car 2: 'Mercedes' going at 95 km/h
// */

// /////////////////////////////////CC#1 COMPLETE///////////////////
// /* */
// // LESSON: ES6 CLASSES
// // class expression
// // const PersonCl = class {};

// // class declaration
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   // Instance Method
//   //  Methods will be added to .prototype property
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.firstName}`);
//   }
//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Set a property that already exists.
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log('Hey there 🙋‍♀️');
//     console.log(this);
//   }
// }

// const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
// jessica.calcAge();
// console.log(jessica.age);

// console.log(jessica.__proto__ === PersonCl.prototype);

// // PersonCl.prototype.greet = function () {
// //   console.log(`Hey ${this.firstName}`);
// // };

// jessica.greet();

// // 1. Classes are NOT 'hoisted'

// // 2. Classes are first-class citizens (pass them into functions and return them from functions)

// //3. Classes are executed in strict mode

// const walter = new PersonCl('Walter White', 1965);

// PersonCl.hey();

// // LESSON: SETTERS AND GETTERS

// const account = {
//   owner: 'James',
//   movements: [300, 650, 560, 910],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.latest); // 910

// account.latest = 100;
// console.log(account.movements);

// // LESSON: STATIC METHODS

// // 1. Instance methods
// // 2. Static methods
/*
//LESSON: OBJECT.CREATE

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
console.log(sarah);
*/
/*
/////////////////// CODING CHALLENGE # 2 ///////////////////////////

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

// Test data:
// § Data car 1: 'Ford' going at 120 km/h

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);
ford.accelerate();

console.log(ford.__proto__);
console.log(ford.speedUS);

///////////////////////////////// CC #2 COMPLETE //////////////////////
*/

// LESSON: INHERITANCE BETWEEN "CLASSES": CONSTRUTCTOR FUNCTIONS
/*
const Person = function (fullName, birthYear) {
  this.fullName = fullName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  //.call can substitute another object for the current argument
  Person.call(this, firstName, birthYear);
  this.course = course;
  console.log();
};

// Linking Prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge(); // 17
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Student);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/
/*
/////////////////// CODING CHALLENGE # 3 ///////////////////////////
// OBJECT ORIENTED PROGRAMMING

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`'${this.make}' is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`'${this.make}' is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;

  console.log(
    `${this.make} is going ${this.speed} km/h, with a charge of ${this.charge}%.`
  );
};
// EV.prototype.constructor = EV;

// console.log(EV.__proto__);

const tesla = new EV('Tesla', 120, 23);

tesla.chargeBattery(90);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.chargeBattery(78);
tesla.brake();
console.log(tesla);
tesla.brake();
///////////////////////////////// CC #3 COMPLETE //////////////////////
*/
/*
CC #3 with if statement for 0% battery
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`'${this.make}' is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`'${this.make}' is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  if (this.charge === 0) {
    console.log('Oh NO MORE BATTERY!');
  } else {
    console.log(
      `${this.make} is going ${this.speed} km/h, with a charge of ${this.charge}%.`
    );
  }
};

EV.prototype.constructor = EV;
const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(2);
tesla.accelerate();
tesla.accelerate();
*/
/*
// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance Method
  //  Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists.
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 🙋‍♀️');
    console.log(this);
  }
}

// LESSON: INHERITANCE BTWEEN: "CLASSES": OBJECT.CREATE

class StudentCl extends PersonCl {
  constructor(fullName, birthyear, course) {
    // SUPER: Always needs to happen first! (this)
    super(fullName, birthyear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}.`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 20
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
*/
/*
// LESSON: INHERITANCE BETWEEN "CLASSES: OBJECT.CREATE"

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};
const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
*/

// LESSON: ANOTHER CLASS EXAMPLE
// LESSON: ENCAPSULATION: PROTECTED PROPERTIES AND METHODS
// 2 reasons to encapsulate our data
// 1. Prevent code from outside of a class to accidently manipulate our data inside of our class.

// LESSON: ENCAPSULATION: PRIVATE "CLASS FIELDS" AND METHODS
// 4 types of class fields
// Public fields (C++ & Java are called fields)
// Private fields
// Public methods
// Private methods
// There is also the static version
/*
class Account {
  // How to declare a public field!(instances)

  locale = navigator.language;

  // 2. Private fields\
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // Protected property
    this.#movements = [];
    this.#pin = pin;
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3. Public methods
  // Public interface (API)
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved`);
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  // 4. Private methods

  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}
const acc1 = new Account('James', 'USD', 1111);
console.log(acc1);

// acc1.movements.push(250);
// acc1.movements.push(-140);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);

console.log(acc1.getMovements());
console.log(acc1);

console.log(acc1.pin);

// console.log(acc.#movements);// Uncaught Syntax error
// console.log(#pin);
// console.log(acc1.#approveLoan(100));

Account.helper();

// LESSON: CHAINGING METHODS
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
*/
/*
///////////////////////// CODING CHALLENGE #4 ///////////////////////////

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going ${this.speed} km/h`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCL extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;

    console.log(
      `${this.make} is going ${this.speed} km/h, with a charge of ${
        this.#charge
      }%.`
    );
    return this;
  }
}

const rivian = new EVCL('Rivian', 120, 23);

console.log(rivian);
rivian.accelerate().accelerate().brake().chargeBattery(25).accelerate();
console.log(rivian.speedUS);
// Test data:
// §  Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
*/

/// No Help CC #4

// CarCl 'Parent Class'
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;

    if (this.speed >= 100) {
      console.log('slow down');
    } else {
      console.log(`${this.make} is going ${Math.trunc(this.speed)} km/h`);
      console.log(this.speed);
    }
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going ${Math.trunc(this.speed)} km/h`);
    if (this.speed >= 100) {
      console.log('slow down');
    } else {
      console.log(`${this.make} is going ${Math.trunc(this.speed)} km/h`);
      console.log(this.speed);
    }
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

// EVCL "Child Class" of CarCl

class EVCL extends CarCl {
  #charge;
  //Class always need a constructor
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;

    if (this.speed >= 100) {
      console.log('slow down');
    } else {
      console.log(`${this.make} is going ${Math.trunc(this.speed)} km/h`);
      console.log(this.speed);
    }

    if (this.#charge === 0) {
      console.log('Oh NO MORE BATTERY!');
    } else
      console.log(
        `${this.make} is going ${Math.trunc(
          this.speed
        )}km/h, with a charge of ${this.#charge}%.`
      );
    return this;
  }
  emergencyStop() {
    this.speed /= 2;

    if (this.speed >= 120) {
      console.log(
        `Slow down there is ia cop-you are going ${Math.trunc(
          this.speed
        )} km/h!`
      );
    } else {
      console.log(
        `You are all good, the cop was eating a donut! ${this.speed}`
      );
    }
    return this;
  }
}
const rivian = new EVCL('Rivian', 120, 23);
console.log(rivian);
rivian
  .accelerate()
  .brake()
  .brake()
  .brake()
  .brake()
  .brake()
  .brake()
  .brake()
  .brake()
  .brake()
  .brake()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .emergencyStop()
  .emergencyStop()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate();

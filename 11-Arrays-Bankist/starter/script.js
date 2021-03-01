'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// LESSON: CREATING DOM ELEMENTS

const displayMovements = function (movements) {
  //similar to 'texcontent'
  containerMovements.innerHTML = '';
  // .textConten = 0;

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
       <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    }${type}</div>
 
        <div class="movements__value">${mov}</div>
      </div>
    `;
    //Appended to the other child elements
    // containerMovements.insertAdjacentHTML('beforeend', html);
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);
// LESSON: COMPUTING NAMES
//creates a new object property inside accounts
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
console.log(createUsernames(accounts));
console.log(accounts);

const user = 'Steven Thomas Williams'; //stw
//toLowerCase, split, map, and join method to get initials
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(function (name) {
//     return name[0];
//   })
//   .join('');

//arrow method to return initials
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(name => name[0])
//   .join('');
// console.log(username);

//END OF LESSON: COMPUTING NAMES
/*
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
//Arrays are objects and have specific tools

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); // => 'd' , 'e'
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
// return a shallow copy of an array
console.log(arr.slice());
console.log([...arr]);

// SPLICE
// Slice MUTATE an array
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr); //=> ['a', 'b']

// REVERSE
// reverse does MUTATE the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
//Combines two arrays
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
// combines an array with any symbol
console.log(letters.join(' - '));
console.log(letters.join(' + '));
console.log(letters.join(' ? '));
console.log(letters.join(' 🍸☺ '));
*/
/*
// LESSON: LOOPING ARRAYS: FOREACH

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// forEach function is a HIGHER ORDER FUCTION (we don't call this function)

// for(const movement of movements)
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
console.log('-----------FOREACH-----------------');
// ****important*** Order of parameters matter
// 1st. Current element
// 2nd. Current index
// 3rd. Entire array we are looping over
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// 0: function(200)
// 1: function(450)
// 2. function(400)
// ...

// When to use for each/ for of
//Cannot breakout of a for each loop, because it will loop forever
*/

// LESSON: forEACH WITH MAPS AND SETS
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// _ means a throw away variable
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${_}: ${value}`);
});
*/

//LESSON: PROJECT----BANKIST APP
//JUST NOTES AND OVERVIEW

//////////CODING CHALLENGE #1///////////////////
/*
// Data 1
const juliasData = [3, 5, 2, 12, 7];
const katesData = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  const juliasData2 = dogsJulia.splice(1, 2);
  console.log(juliasData2);
  // const dogs = juliasData2.concat(dogsKate);
  // console.log(dogs);

  for (let i = 0; i < juliasData2.length; i++) {
    console.log(`"------Julia's Dogs #${i + 1}-------"`);
    if (juliasData2[i] >= 3) {
      console.log(
        `Dog number ${i + 1} is an adult, and is ${juliasData2[i]} years old`
      );
    } else {
      console.log(`Dog number ${i + 1} is still a puppy🐶`);
    }
    for (let j = 0; j < dogsKate.length; j++) {
      console.log(`"------Kate's Dogs #${j + 1}-------"`);
      if (dogsKate[j] >= 3) {
        console.log(
          `Dog number ${j + 1} is an adult, and is ${dogsKate[j]} years old`
        );
      } else {
        console.log(`Dog number ${j + 1} is still a puppy🐶`);
      }
    }
  }
};
checkDogs(juliasData, katesData);
///for each checkDogs
*/
/*
///After help
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliasCorrected = dogsJulia.slice();
  dogsJuliasCorrected.splice(0, 1);
  dogsJuliasCorrected.splice(-2);
  const dogs = dogsJuliasCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs(juliasData, katesData);
*/
/*
//LESSON: MAP METHOD
//Map method gives a brand new array bby applying a callback function

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

console.log(movements);
console.log(movementsUSD);

const movementsUSDFor = [];
for (const mov of movements) movementsUSDFor.push(mov * eurToUsd);
console.log(movementsUSDFor);

// returns movements action to the Movements section
const movementsDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);
*/

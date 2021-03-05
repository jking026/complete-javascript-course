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
 
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    //Appended to the other child elements
    // containerMovements.insertAdjacentHTML('beforeend', html);
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//creates and displays balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// Calculates incomes, out, and interest
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  //Outgoing movements
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // Math.abs() gives only positive values
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    // filters(excludes) out < 1 values
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};
// EVENT HANDLER
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevents form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  //optional chaining with ? before pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  //Hint-if you hear any think of the .some() method
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    // .indexof(23)
  }
  inputCloseUsername.value = inputClosePin.value = '';
  labelWelcome.textContent = 'Log in to get started';
});

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
/*
// LESSON: FILTER METHOD
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

const withdrawalsFilter = movements.filter(mov => mov < 0);

console.log(withdrawalsFilter);
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = [];
for (const mov of movements) if (mov < 0) withdrawals.push(mov);
console.log(withdrawals);
// END OF LESSON: FILTER METHOD
*/
/*
// LESSON: REDUCE METHOD


// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

//Arrow function for balance
const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

const min = movements.reduce((acc, mov) => {
  if (acc < mov) return acc;
  else return mov;
}, movements[0]);
console.log(min);
*/

// End of L: REDUCE ARRAYS

/////////////// CODING CHALLENGE #2  //////////
/*
BEFORE HELP-SUCCESSFUL
*/
//function that accepts arrays of dog's ages(par(ages)) and returns...
// const calcAverageHumanAge = function (ages) {
//   // 1. map() method
//   const humanAges = ages.map(function (dogsAge) {
//     if (dogsAge <= 2) {
//       return dogsAge * 2;
//     } else if (dogsAge > 2) {
//       return 16 + dogsAge * 4;
//     }
//   });

//   // 2. filter() method
//   const filterAges = humanAges.filter(ages => ages >= 18);
//   console.log(filterAges);
//   // 3. reduce() method
//   const avgHumanAge = filterAges.reduce(function (acc, ages) {
//     return acc + ages / filterAges.length;
//   }, 0);
//   console.log(avgHumanAge);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

/*
VIDEO SOLUTION
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   console.log(average);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

/*
// LESSON: THE MAGIC OF CHAINING METHODS
const eurToUsd = 1.1;
console.log(movements);

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    // .map(mov => mov * eurToUsd)
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/
/*
///////////CODING CHALLENGE #3 //////////
// Before help-miscalculated the .reduce(avg)
const calcAverageHumanAge = ages =>
  ages
    .map((age, i, arr) => {
      return age <= 2 ? 2 * age : 16 + age * 4;
    })
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// const calcAverageHumanAge = ages =>
//   ages
//     .map((age, i, arr) => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter(age => age >= 18)
//     // arr param is the only way to calc avg
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1);
console.log(avg2);
🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁CODING CHALLENGE #3- COMPLETE 🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁
*/
/*
// LESSON: FIND METHOD
// Find method needs a callback that returns a boolean
//first element in arr will be returned that satisfies it
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/
/*
// LESSON: SOME AND EVERY METHOD
console.log(movements);

// Only checks for EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITIONS -any value = true

console.log(movements.some(mov => mov === -130));
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

// EVERY- if 'EVERY' element passes than the every method will be truthy
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Serperate callback
// Saving a callback into a reusable variable
const deposit = mov => mov < 0;
console.log(movements.filter(deposit));
*/

// LESSON: FLAT AND FLATMAP

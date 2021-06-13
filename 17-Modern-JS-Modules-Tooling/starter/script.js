// Importing module
// IMPORTS MUTATE ARRAYS & OBJECTS
// All modules are in strict mode
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('loaves of bread', 5);
// // import an object with a different name (i.e.: totalPrice as price)
// console.log(price, tq);

console.log('Importing module');
// (* === everything) this will import everything into an object that is imported like a Class or public api
// import shoppingCart, * as ShoppingCart from './shoppingCart.js';

// ShoppingCart.addToCart('pieces of candy', 20);
// console.log(ShoppingCart.totalPrice);

// DEFAULT: import
import add, { cart } from './shoppingCart.js';
add('pizzas', 5);
add('bread', 2);
add();
console.log(cart);

import { register, cashInDrawer as cid } from './shoppingCart.js';

cid(15, 50);
console.log(register);

/*
import shoppingCart from './shoppingCart.js';

// LESSON: MODULE PATTERN
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 250;
  const totalQuantity = 26;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ) ${shippingCost}`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  // (CLOSURES) Will encapsulate anything that ISN'T RETURNED
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('bananas', 10);

ShoppingCart2.addToCart('burritos', 30);
//
console.log(ShoppingCart2);
// Will not access shippingCost
console.log(ShoppingCart2.shippingCost); // => undefined
*/
/*
// LESSON: COMMONJS MODULES


// (Syntax error)
// Export 
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to cart (shipping cost is ) ${shippingCost}`
  );
};

//Import 
const {addToCart} = require('./shoppingCart.js')

*/

// LESSON: INTRODUCTION TO NPM

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  car: [
    { product: 'bread', quantity: 10 },
    {
      product: 'candy',
      quantity: 26,
    },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
console.log(stateClone);
state.user.loggedIn = false;

console.log(stateDeepClone);

// LESSON: BUNDLING WITH PARCEL AND NPM SCRIPTS

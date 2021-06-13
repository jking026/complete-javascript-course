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

// Exporting module
console.log('Exporting module');

// these are only scoped in this module
const shippingCost = 10;
export const cart = [];

// export const register = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart `);
};

// export const cashInDrawer = function (bills, coins) {
//   register.push({ bills, coins });
//   console.log(`$${bills}.${coins} added to register`);
// };

const totalPrice = 237;
const totalQuantity = 23;
// export an object with a different name (i.e.: totalQuantity as tq)
export { totalPrice, totalQuantity as tq };

//Default exports: when we want to export 1 thing per module
//export the function rather than the variable
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart `);
}

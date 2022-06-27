// Importing module
// import { addToCart, cart, shippingCost as shipping } from './shoppingCart.js';
//
// addToCart('Lime', 10);
// console.log(cart, shipping);

// Import all; appearance of a Class
// import * as ShoppingCart from './shoppingCart.js';
//
// ShoppingCart.addToCart('bread', 4);
// console.log(ShoppingCart);
// console.log(ShoppingCart.cart);

// export/Import default
// import add, {addToCart} from './shoppingCart.js'; // Try not to mix named
// and default imports
// import add from './shoppingCart.js';
//
// add('Pizza', 20);

import { getUsers } from './shoppingCart.js';
import forEach from 'lodash-es/forEach.js';

// if (module.hot) {
//   module.hot.accept;
// }

// getUsers()
//   .then(res => {
//     forEach(res, rec => console.log(rec[1].email));
//   });

// console.log('Importing module');

import cloneDeep from 'lodash-es/cloneDeep.js';
//
const state = {
  cart: [{ product: 'bread', quantity: 3 }, { product: 'pizza', quantity: 2 }], user: { loggedIn: true }
};
//
const stateClone = Object.assign({}, state);
const stateClone2 = cloneDeep(state);
stateClone.user.loggedIn = false;
// console.log(stateClone);
// console.log(stateClone2);


// console.log('Petr' ?? null);
console.log(state.cart.find(el => el.quantity > 0));


class Person {
  greeting = 'Hello';

  constructor(name) {
    console.log(`${this.greeting}, ${name}`);
  }
}

const petr = new Person('Petr');
const jeff = new Person('Jeff');
const fred = new Person('Fred');

import 'core-js/stable';
import 'regenerator-runtime/runtime';

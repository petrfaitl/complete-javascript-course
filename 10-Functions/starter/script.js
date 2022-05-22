'use strict';

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 100 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  //   console.log(booking);
  //   bookings.push(booking);
};

// createBooking('LH123', 3, 299);
// createBooking('LH123', 5);
// createBooking('LH123', undefined, 699);

const flight = 'OK123';
const passenger1 = {
  name: 'Petr Faitl',
  passport: 1234567890,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH123';
  passenger.name = `Mr. ${passenger.name}`;

  if (passenger.passport === 1234567890) {
    alert('Checked-in');
  } else {
    alert('Wrong passport number');
  }
};

const newPassport = function (person) {
  person.passport = Math.floor(Math.random() * 10000000000);
};
// newPassport(passenger1);
// checkIn(flight, passenger1);
// console.log(passenger1);

// Higher Order Functions
// 1 Function that receives another function
// const greeting = () => alert('Greetings, you bought a new plane!');
// document.querySelector('.buy').addEventListener('click', greet); //Greet is a callbak. Function executed at a later date.

// 2 Function that returns another function

function count() {
  let counter = 0;

  return function () {
    counter++;
  };
}

// console.log('count:', count());

const oneWord = function (str = 'Test') {
  return str.replaceAll(' ', '').toLowerCase();
};

// document.querySelector('.poll').addEventListener('click', oneword);

const upperFirstWord = function (sentence) {
  const [first, ...others] = sentence.split(' ');
  return `${first.toUpperCase()} ${others.join(' ')}`;
};

// Higher order function
// Abstraction - function not concerned with implementation. That is done at a callback function.
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by ${fn.name}`);
};

// transformer('Javascript is crazy', upperFirstWord);
// transformer('JavaScript is crazy', oneWord);

// Closures
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name} `);
  };
};
const greeterHey = greet('Hey');
// greeterHey('Petr');
// greeterHey('Bob');

// greet('Hello')('Petr');

// Rewritten as an arrow function
const greet2 = greeting => name => console.log(`${greeting} ${name}`);
// greet2('Howdy')('Jess');

// Call and Apply, (Bind)
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  booking: [],
  book(flightNum, passengerName) {
    console.log(
      `${passengerName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
    );
    this.booking.push({ flight: flightNum, 'passenger name': passengerName });
  },
};

// lufthansa.book(239, 'Petr Faitl');
// lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  booking: [],
};

const swiss = {
  airline: 'Swiss',
  iataCode: 'LX',
  booking: [],
};
const book = lufthansa.book;
// book(23, 'Sara Small'); Does not work

// book.call(eurowings, 23, 'Sara Small');

// book.call(lufthansa, 55, 'Richard Geere');

// Apply method
const flightData = [583, 'George Bush'];
// book.apply(swiss, flightData); // Not used much anymore, as can usse the spread operator and call instead
// book.call(swiss, ...flightData); // Modern JS way

// Bind - create a permanent function with  params 'baked in'.
// const bookLX = book.bind(swiss);
// const bookLH = book.bind(lufthansa);
// const bookEW = book.bind(eurowings);
// bookLX(...flightData);

// Also
const bookEW23 = book.bind(eurowings, 23); // Partial application pattern; presetting some varibles pre-defined
// bookEW23('Katherine Faitl');
// bookEW23('James May');

// console.table(lufthansa.booking);
// console.table(eurowings.booking);
// console.table(swiss.booking);

//  with event listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// console.log(lufthansa);
const buyNewPlane = lufthansa.buyPlane;
// swiss.planes = 500;
// const buyPlaneLH = buyNewPlane.bind(lufthansa);
// const buyPlaneLX = buyNewPlane.bind(swiss);

document
  .querySelector('.buy')
  .addEventListener('click', buyNewPlane.bind(lufthansa));

// buyPlaneLH();
// buyPlaneLX();

// Partial application

const addTax = (rate, value) => value + (value * rate) / 100;

// console.log(addTax(20, 100));

const addVAT = addTax.bind(null, 23);

// console.log(addVAT(200));

const addVAT2 = rate => value => value + (value * rate) / 100;
addVAT2(15)(200);

const addTaxRate = function (rate) {
  return function (value) {
    return value + (value * rate) / 100;
  };
};
const addVAT3 = addTaxRate(23);
// console.log(addVAT3(2000));

// IIFE

// IIFE are used for scoping
// Also for functions executed only once;

const runOnce = function () {
  console.log(`This will run once`);
};
// runOnce();

// (function () {
//   console.log(`This will run once`);
// })();

// (() => console.log(`Thiss will ALSO run once`))();

// IIFE not used as much in modern js with the let and const variable definitions as they are block scoped and do not need scoping inside IIFE.
// Block scoping will hide the variable once insside a block
{
  const isPrivate = 23;
}
// console.log(isPrivate); // not accessible outside the block

// Closures

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`~ passengerCount`, passengerCount);
  };
};
// closure - enabless function to remember enclosing variables at teh time of creation.
// const booker = secureBooking();
// booker();
// booker();
// booker();
// booker();
// console.dir(booker);

// Functional programming

const str =
  '[some description](https://www.motionpictures.org/film-ratings/) ![pic1](/link/to/image/location1.png) _some important text_ *some other important message*';

const linkify = str =>
  str.replace(
    /\[([^\]"<]*)\]\(([^)<"]*)\)/g,
    '<a href="$2" rel="nofollow, noopener">$1</a>'
  );

const imagify = str =>
  str.replace(/!\[([^\]"<]*)\]\(([^)<"]*)\)/g, '<img src="$2" alt="$1"');

const emphasify = str => str.replace(/[\*_]([^_]*)[\*_]/g, '<em>$1</em>');
const res = linkify(str);
// console.log(res);

const c2 = (fn1, fn2) => x => fn1(fn2(x));
const linkifyAndImagify = c2(linkify, imagify);
// console.log(linkifyAndImagify(str));

const emLinkImg = c2(linkify, c2(imagify, emphasify));
// console.log(emLinkImg(str));

const compose =
  (...fns) =>
  x0 =>
    fns.reduceRight((x, f) => f(x), x0);

const processText = compose(linkify, imagify, emphasify);
// console.log(processText(str));

// More Closures

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

// g();
// f();

// // Re-assign f function

// h();
// f();

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups with ${perGroup} passengers.`);
  }, wait * 1000);

  console.log(`Boarding will start in ${wait} seconds`);
};

// boardPassengers(180, 3);

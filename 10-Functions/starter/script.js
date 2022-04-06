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
const greet = () => alert('Greetings, you bought a new plane!');
document.querySelector('.buy').addEventListener('click', greet); //Greet is a callbak. Function executed at a later date.

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

transformer('Javascript is crazy', upperFirstWord);
transformer('JavaScript is crazy', oneWord);

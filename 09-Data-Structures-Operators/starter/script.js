'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const hours = {
    thu: {
        open: 12,
        close: 22,
    },
    fri: {
        open: 11,
        close: 23,
    },
    sat: {
        open: 0, // Open 24 hours
        close: 24,
    },
};

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
    // Enhanced object literals
    hours,
    // openingHours: {
    //   thu: {
    //     open: 12,
    //     close: 22,
    //   },
    //   fri: {
    //     open: 11,
    //     close: 23,
    //   },
    //   sat: {
    //     open: 0, // Open 24 hours
    //     close: 24,
    //   },
    // },
    orderDelivery({
                      starterIndex = 1,
                      mainIndex = 0,
                      address,
                      time = '20:00'
                  }) {
        console.log(
            `Your order of ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
        );
    },
    orderPasta(ing1, ing2, ing3) {
        console.log(
            `You've ordered pasta with ${ing1}, ${ing2} and ${ing3}. Bon appetit!`
        );
    },
    orderPizza(mainIngredient, ...restIngredients) {
        console.log(mainIngredient);
        console.log(restIngredients);
    },
};
//  Instant desctructuring; object as an argument
// restaurant.orderDelivery({
//   time: '22:30',
//   address: '39 River Oaks Drive, Tauranga',
//   starterIndex: 2,
//   mainIndex: 1,
// });

// Default values pre-defined in the function
// restaurant.orderDelivery({
//   address: '39 River Oaks Drive, Tauranga',
//   starterIndex: 3,
// });

restaurant.homeAddress = 'River Oaks Drive, Tauranga';

// Desctructure Object
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// Destructuring and renaming Variables

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// Default values from objects
const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// Nested Objects

const { fri } = restaurant.hours;
// console.log(fri);

// const {
//   fri: { open: o = '0', close: c },
// } = restaurant.openingHours;

// console.log(o, c);

// Mutating Variables
let a = 111;
let b = 999;

const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
// console.log(a, b);

// Desctructure Array

// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];
// const [x, y] = arr;
// console.log(x, y);

// const [starter, main] = restaurant.order(2, 0);
// console.log(starter, main);

// // Nested Destructuring

// const nested = [2, 4, [5, 6]];
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// Swapping values

let aa = 23;
let bb = 999;

// console.log(aa, bb);
[aa, bb] = [bb, aa];

// console.log(aa, bb);

// Using the spread operator

const arr = [1, 2, 3];
const badArr = [6, 7, arr[0], arr[1], arr[2]];
// console.log(badArr);

const goodArr = [8, 9, ...arr];
// console.log(goodArr);

// console.log(...goodArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

const [aaa, ab, ac] = [...newMenu];

// console.log(aaa, ab, ac);

// const ingredients = [
//   prompt('Please enter ingredients. Ingredient 1:'),
//   prompt('Ingredient 2:'),
//   prompt('Ingredient 2:'),
// ];

// console.log(restaurant.orderPasta(...ingredients));

// Objects spread operator in EMEA 2018
const newRestaurant = { FoundedIn: 1998, ...restaurant, founder: 'Bob' };
// console.log(newRestaurant);

// Rest operator; On LEFT SIDE OF OPERATOR

// const [x, y, ...others] = [1, 2, 3, 4, 5, 6];

// console.log(x, y, others);
const [pizza, risotto, ...otherFood] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu,
];
// console.log(pizza, risotto, otherFood);

// const { sat, ...weekdays } = restaurant.openingHours;

// console.log(weekdays);
// console.log();

// Spread and rest together
//Using Rest as a parameter (rest creates an array from params)
const add = function (...numbers) {
    const sum = numbers.reduce((tot, el) => (tot += el));
    console.log(sum);
};

// const { sat: saturday } = restaurant.openingHours;
// console.log(saturday);

// add(2, 3);
// add(2, 4, 6, 8, 10);
// const xy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// add(...xy); //Spread destructures an array

// restaurant.orderPizza('bacon', 'mushrooms', 'cheese');

// Short circuit evaluation

// console.log('------- OR -------');
// console.log(3 || 'Jonas'); // Return truthy values
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);

// // restaurant.guestNumber = 22;
// // carefull if number of guests is zero
// const guests = restaurant.guestNumber ? restaurant.guestNumber : 10;
// console.log(guests);

// const guests2 = restaurant.guestNumber || 11; // short-circuiting ternary operator
// console.log(guests2);

// console.log('------- AND -------');

// console.log(0 && 'Jonas'); // if false return first param
// console.log(9 && 'Jonas'); //if true return last element or false element

// Nullish coalescing operator; nullish = null, undefined (not 0 or '')
restaurant.numGuests;
const guestsCorrect = restaurant.numGuests ?? 10;
// console.log(guestsCorrect);

//  Logical assignment operator

const rest1 = {
    name: 'Classico Italiano',
    numGuests: 0,
};
const rest2 = {
    name: 'Nobile',
    owner: 'Guessepe Rossi',
};

// OR assignment operator
// rest2.numGuests = rest2.numGuests || 10; // Equivalent to below
// rest1.numGuests = rest1.numGuests || 10;

// rest1.numGuests ||= 10;

rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// console.log(rest1);
// console.log(rest2);

// Logical && operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
// console.log(rest1);
// console.log(rest2);

// console.log(restaurant.hours);

// ##############################
// Optional chaining ES6
// console.log(restaurant.hours.mon?.open);
// console.log(restaurant.openingHours?.mon?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
    const open = restaurant.hours[day]?.open ?? 'closed'; // optional chaining and  Nullish coalescing operator
    // console.log(`On ${day} our restaurant is ${open}`);
}

// optional chaing  on methods

// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderPizza?.(0, 1) ?? 'Method does not exist'); // Test if function exists

// Optional chaining Arrays
const res = [{ name: 'Jonas', lastName: 'Schmedtmann' }];
// console.log(users[0]?.name ?? "User doesn't exist"); // Optional chaing with Nullish coalescing operator

// Looping over objects

for (const day of Object.keys(hours)) {
    // console.log(day);
}

// const keys = Object.keys(hours);
// console.log(keys.values());
// for (const key of keys.keys()) {
// console.log(key);
// }

// let openStr = `We are open on ${keys.length}. These are: `;

// for (const day of keys) {
//   openStr += `${day},`;
// }
// console.log(openStr);

// Looping over object
const values = Object.values(hours);
// console.log(values);

const keys = Object.keys(hours);
// console.log(keys);
const entries = Object.entries(hours);
// console.log(entries);

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close ay ${close}`);
// }

// Sets & Maps starting with ESS2016
// Remove duplicate values

const ordersSet = new Set([
    'Pasta',
    'Risotto',
    'Pizza',
    'Pizza',
    'Pizza',
    'Pizza',
    'Pizza',
    'Pizza',
    'Pizza',
]);

// console.log(ordersSet);
// console.log(ordersSet.size);
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');

// console.log(ordersSet);
ordersSet.delete('Pasta');
// console.log(ordersSet);
// console.log(ordersSet.values());

for (const order of ordersSet) {
    // console.log(order);
}

const staffUnique = [
    ...new Set(['Waiter', 'Cheff', 'Manager', 'Cheff', 'Bouncer', 'Waiter']),
]; //Using spread operator
// console.log(staffUnique);
// console.log(new Set('PetrFaitl').size);

// Maps

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');
// console.log(rest.set(2, 'Lisbon, Portugal'));
rest
    .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
    .set('open', 11)
    .set('closed', 23)
    .set(true, 'We are open')
    .set(false, 'We are closed');

// console.log(rest.get('name'));
// console.log(rest.get(true));
const time = 20;

// console.log(rest.get(time > rest.get('open') && time < rest.get('closed')));

// console.log(rest.has('categories'));
// console.log(rest.size);
// console.log(rest.clear());
// rest.set(document.querySelector('h1'), 'heading');
// console.log(rest);

const question = new Map([
    ['question', "What's the best programming language?"],
    [1, 'C'],
    [2, 'java'],
    [3, 'javascript'],
    ['correct', 3],
    [true, 'Correct'],
    [false, 'Try again.'],
]);

// console.log(question.get('question'));
// console.log(Object.entries(hours));
// const hoursMap = new Map(Object.entries(hours));
// console.log(hoursMap);
// console.log(hoursMap.get('thu'));
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key == 'number') console.log(`Option ${key}: ${value}`);
// }
// const userAnswer = 3; //prompt('Your answer?');

// console.log(question.get(userAnswer == question.get('correct')));

// Convert Map to an Array

// console.log([...question]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

// const q2 = new Map([
//   ['question', 'is this a test?'],
//   [1, 'C#'],
//   [true, 'Yes'],
// ]);
// console.log(q2);

// Which data structure to use When?

// Sources of data
// 1)  Source code
// 2) UI (form, DOM)
// 3) fetch from web API(recipe objects, weather)

// Collections of data => data structure => decision

// 1) Simple list => Array or Set
// 2) Object or map (key, value)=> allows description of data
// 3) others -- weakMap, weakSet,etc

// JSON => common data structure

// Arrays
const task = ['Code', 'Eat', 'Code'];
// ['Code', 'Eat','Code']
// ordered, duplicates, manipulation

// Sets
const task2 = new Set(['Code', 'Eat', 'Sleep', 'Code']);
// ['Code', 'Eat']
// unique values, high performance, removing duplicates
// Not replacing arrays

// Objects
const task3 = {
    task: 'Code',
    date: 'today',
    repeat: true,
};
// traditional; easier to access values with . and [] notation;
// Use when working with JSON (can convert to map)
// When you need to use functions (methods). Use of this keyword

// Maps
const task4 = new Map([
    ['task', 'Code'],
    ['date', 'today'],
    [false, 'Start coding'],
]);
// better performance; can have any data type; easy to iterate; easy to compute size
// Use Maps to simply map keys to values; when you need keys that are not strings

// Working  with String
const airline = 'TAP Air Portugal';
const plane = 'A380';

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

const passenger = 'jOnAs';
const passengerNew = passenger
    .slice(0, 1)
    .toUpperCase()
    .concat(passenger.slice(1).toLowerCase());
// console.log(passengerNew);

const email = ' TestinG@Example.Com \n';
const normalisedEmail = email.toLowerCase().trim();

// console.log(normalisedEmail);

// Replacing

const priceGB = '£288,45';
// console.log(priceGB);
const priceUS = priceGB.replace('£', '$').replace(',', '.');
// console.log(priceUS);

const announcement =
    'All passengers come to boarding door 23. Boarding door 23';
// console.log(announcement.replace(/door/g, 'gate'));

// capitalise names

const capitaliseNames = function (name) {
    const names = name.split(' ');
    const uppercaseNames = [];

    for (const n of names) {
        uppercaseNames.push(n.replace(n[0], n[0].toUpperCase()));
    }
    // console.log(uppercaseNames.join(' '));
};

capitaliseNames('sarah jessica parker');
capitaliseNames('emma raducanu');

// Padding

const message = 'Go to gate 23!';
// console.log(
//   message
//     .padStart(message.length + 1, ' ')
//     .padEnd(message.length + 2, ' ')
//     .padStart(message.length + 12, '#')
//     .padEnd(message.length + 20, '#')
// );

const maskCreditCard = number => {
    const str = number + '';
    const secretNumber = str.slice(-4);
    console.log(secretNumber.padStart(str.length, '*'));
};

// maskCreditCard(1234567890);
// maskCreditCard(453664352343213456);

// Repeat

const messag2 = 'Bad weather, departure delayed! ';
// console.log(messag2.repeat(5));

const planesWaiting = function (n) {
    console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}. `);
};

// planesWaiting(5);
// planesWaiting(3);
// planesWaiting(15);
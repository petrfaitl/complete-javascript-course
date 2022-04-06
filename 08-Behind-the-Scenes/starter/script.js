'use strict';

// const a = 'Jonas';
// first();

// function first() {
//   const b = 'Hi';
//   second();

//   function second() {
//     const c = 'Boo';

//     third();
//   }
// }

// function third() {
//   const d = 'Foo';
//   console.log(a, b, c, d); //variables not accessible due to scoping; only d availableScope
// }

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     var millenial = true; //function scoped

//     const output = `You are ${age} years old, born in ${birthYear}, ${firstName}.`;
//     // console.log(output);
//     if (birthYear >= 1981 && birthYear <= 1996) {
//       const firstName = 'Bob';
//       const str = `Oh, you're a millenial, ${firstName}.`;
//       //   console.log(str);
//     }
//     console.log(millenial); //function scoped; will work
//   }
//   printAge();
//   return age;
// }

// const firstName = 'Jonas';

// calcAge(1996);

// Do not use arrow function as a method!
// const jonas = {
//   firstName: 'Jonas',
//   year: 2001,
//   age: 0,
//   calcAge: function () {
//     const age = 2037 - this.year;
//     console.log(age);
//     return age;
//   },
//   greet: function () {
//     console.log(`hey ${this.firstName}`);
//   },
// };

// console.log(jonas.greet());

function funcDecl(...numbers) {
  console.log(arguments);
  return;
}

funcDecl(1, 2, 3, 4, 5, 6, 7);

const funcExp = function (...numbers) {
  console.log(arguments);
  return;
};

funcExp(1, 2, 3, 4, 5, 6, 7);

// Won't  work; no arguments kw in arrow functions
const funcArrow = (...numbers) => {
  console.log(arguments);
  return;
};

funcArrow(1, 2, 3, 4, 5, 6, 7);

// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// console.log(23);

// const testWord = "This is bullshit test";

// const reverseWord = (minLetters) => (word) => {
//   return word.length >= minLetters ? word.split("").reverse().join("") : word;
// };

// function spinWords(string) {
//   const words = string.split(" ");
//   const minLetterLength = 5;
//   const spunWords = words.map(reverseWord(minLetterLength));
//   return spunWords.join(" ");
// }
// console.log(spinWords(testWord));

//
// digPow(89, 1) should return 1 since 8¹ + 9² = 89 = 89 * 1
// digPow(92, 1) should return -1 since there is no k such as 9¹ + 2² equals 92 * k
// digPow(695, 2) should return 2 since 6² + 9³ + 5⁴= 1390 = 695 * 2
// digPow(46288, 3) should return 51 since 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51

// function digPow(n, p) {
//   const sum = String(n)
//     .split("")
//     .reduce((total, el, index) => {
//       total += Math.pow(el, p + index);
//       return total;
//     }, 0);
//   return sum % n ? -1 : sum / n;
// }
// console.log(digPow(695, 2));
// console.log(digPow(89, 1));
// console.log(digPow(46288, 3));

// sum(1, 2, 3) // => 6
// sum(8, 2) // => 10
// sum(1, 2, 3, 4, 5) // => 15

//// Sum of all arguments
// function sum(...args) {
//   return args.reduce((s, e) => s + e, 0);
// }

// console.log(sum(3, 4, 5, 6));
// console.log(sum(1, 2, 3, 4, 5));

// Write a simple function that takes as a parameter a date object and returns a boolean value representing whether the date is today or not.

// Make sure that your function does not return a false positive by just checking just the day.

// function isToday(date) {
//   return (
//     date.toLocaleDateString() === new Date(Date.now()).toLocaleDateString()
//   );
// }
// const today = new Date();
// console.log(today);
// console.log(isToday(today));
// console.log(new Date(Date.now()));

// const assert = require("chai").assert;
// describe("Sample tests", () => {
//   const today = new Date();
//   it("should work for today", () => {
//     let actualToday = isToday(today);
//     assertNotPrinting(actualToday);
//     assert.strictEqual(actualToday, true);
//   });

//   it("should work for tomorrow", () => {
//     const tomorrow = new Date();
//     tomorrow.setDate(today.getDate() + 1);
//     assert.strictEqual(isToday(tomorrow), false);
//   });

//   it("should work for yesterday", () => {
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);
//     assert.strictEqual(isToday(yesterday), false);
//   });

//   function assertNotPrinting(actual) {
//     assert.isDefined(
//       actual,
//       "You should return true or false. Did you print the answer instead?\n"
//     );
//   }
// });

// Create a function that returns the sum of the two lowest positive numbers given an array of minimum 4 positive integers. No floats or non-positive integers will be passed.

// For example, when an array is passed like [19, 5, 42, 2, 77], the output should be 7.

// const arr = [10, 343445353, 3453445, 3453545353453]; // should return 3453455.

// function sumTwoSmallestNumbers(numbers) {
//   return numbers
//     .sort((a, b) => a - b)
//     .slice(0, 2)
//     .reduce((s, e) => s + e, 0);
// }

// console.log(sumTwoSmallestNumbers(arr));

//
// Growth of a Population
//

// In a small town the population is p0 = 1000 at the beginning of a year. The population regularly increases by 2 percent per year and moreover 50 new inhabitants per year come to live in the town. How many years does the town need to see its population greater or equal to p = 1200 inhabitants?
// At the end of the first year there will be:
// 1000 + 1000 * 0.02 + 50 => 1070 inhabitants

// At the end of the 2nd year there will be:
// 1070 + 1070 * 0.02 + 50 => 1141 inhabitants (** number of inhabitants is an integer **)

// At the end of the 3rd year there will be:
// 1141 + 1141 * 0.02 + 50 => 1213

// It will need 3 entire years.
// p0, percent, aug (inhabitants coming or leaving each year), p (population to surpass)
// the function nb_year should return n number of entire years needed to get a population greater or equal to p.
// aug is an integer, percent a positive or null floating number, p0 and p are positive integers (> 0)
// Examples:
// nb_year(1500, 5, 100, 5000) -> 15
// nb_year(1500000, 2.5, 10000, 2000000) -> 10
// Note:
// Don't forget to convert the percent parameter as a percentage in the body of your function: if the parameter percent is 2 you have to convert it to 0.02.

// function nbYear(p0, percent, aug, p) {
//   let y = 0;
//   while (p0 < p) {
//     p0 = Math.floor(p0 * (1 + percent / 100) + aug);
//     y++;
//   }

//   return y;
// }

// console.log(nbYear(1000, 2, 50, 1200));
// console.log(nbYear(1500, 5, 100, 5000));
// console.log(nbYear(1500000, 2.5, 10000, 2000000));
// console.log(nbYear(1500000, 0.25, 1000, 2000000));
// console.log(nbYear(1500000, 0.25, -1000, 2000000));

// console.log(nbYear(1500, 5, 100, 5000));
// console.log(nbYear(1500000, 2.5, 10000, 2000000));
// console.log(nbYear(1500000, 0.25, 1000, 2000000));
// console.log(nbYear(1500000, 0.25, -1000, 2000000));
// console.log(nbYear(1500000, 0.25, 1, 2000000));
// console.log(nbYear(1500000, 0, 10000, 2000000));

// PROBLEM 1
// Caclulate temperature amplitude. Keep in mind there are temp errors at times.

// const temp = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];
// const temp2 = [3, 5, 2];

// const calcTempAmplitude = (arr) => {
//   const validTemp = arr.filter((e) => typeof e === "number");
//   validTemp.sort((a, b) => a - b);
//   return validTemp[validTemp.length - 1] - validTemp[0];
// };

// console.log(calcTempAmplitude(temp));
// console.log(calcTempAmplitude(temp2));

// PROBLEM 2

// Function receives two arrays

// const temp = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];
// const temp2 = [3, 5, 2];

// const calcTempAmplitude = (arr, arr2) => {
//   arr = arr.concat(arr2);
//   const validTemp = arr.filter((e) => typeof e === "number");
//   validTemp.sort((a, b) => a - b);
//   return validTemp[validTemp.length - 1] - validTemp[0];
// };

// console.log(calcTempAmplitude(temp, temp2));
// // console.log(calcTempAmplitude(temp2));

// Debugging in console

// const measureKelvin = function () {
//   const measure = {
//     type: "temp",
//     unit: "celsius",
//     value: Number(prompt("Enter value in Celsius")),
//   };

//   console.table(measure);
//   const kelvin = measure.value + 273;
//   return kelvin;
// };

// console.log(measureKelvin());

// Coding Challenge #1
// Given an array of forecasted maximum temperatures, the thermometer displays a
// string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1
// days ... 21ºC in 2 days ... 23ºC in 3 days ..."
// Your tasks:
// 1. Create a function 'printForecast' which takes in an array 'arr' and logs a
// string like the above to the console. Try it with both test datasets.
// 2. Use the problem-solving framework: Understand the problem and break it up
// into sub-problems!
// Test data:
// § Data 1: [17, 21, 23]
// § Data 2: [12, 5, -5, 0, 4]

// const printForecast = function (arr) {
//   let forecast = "... ";
//   for (let i = 0; i < arr.length; i++) {
//     forecast += `${arr[i]}°C in ${i + 1} days ... `;
//   }
//   return forecast;
// };

const printForecast = function (arr) {
  return arr.reduce(
    (s, e, i) => (s = s + ` ${e}°C in ${i + 1} days ...`),
    "... "
  );
};

console.log(printForecast([12, 5, -5, 0, 4]));

"use strict";

// let hasDriversLicence = false;
// const passedTest = true;

// if (passedTest) hasDriversLicence = true;

// if (hasDriversLicence) console.log("I can drive");

// //Function declaration; can be called before defined
// function calculateAge1(birthYear) {
// 	const date = new Date(Date.now());
// 	return date.getFullYear(0) - birthYear;
// }

// console.log(calculateAge1(1976));

// // Function declaration; cannot be called before defined
// const calculateAge2 = function (birthYear) {
// 	return 2022 - birthYear;
// };

// console.log(calculateAge2(1976));

//Arrow functions

// const calculateAge3 = (birthYear) => 2022 - birthYear;

// console.log(calculateAge3(1976));

// const yearTillRetirement = (birthYear, firstName) => {
// 	const age = 2022 - birthYear;
// 	const retirement = 65 - age;
// 	return `${firstName} retires in ${retirement} years`;
// };

// console.log(yearTillRetirement(1976, "Petr"));

// console.log(yearTillRetirement(2010, "Kate"));

//Functions calling other functions

// function cutPieces(fruit, pieces) {
// 	return fruit * pieces;
// }

// function fruitProcessor(apples, oranges) {
// 	const applePieces = cutPieces(apples, 4);
// 	const orangePieces = cutPieces(oranges, 3);

// 	const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces.`;
// 	return juice;
// }

// console.log(fruitProcessor(2, 3));

// const friends = ["Michael", "Steven", "Peter"];

// friends.push("Jay");

// console.log(friends);

// const popped = friends.pop();
// console.log(popped);
// console.log(friends);

// const shifted = friends.shift();
// console.log(shifted);
// console.log(friends);

// const unshifted = friends.unshift("John");
// console.log(unshifted);
// console.log(friends);

// Objects

const jonasArray = [
	"jonas",
	"Schmedtmann",
	"35",
	"teacher",
	["Michael", "Peter", "Steven"],
];

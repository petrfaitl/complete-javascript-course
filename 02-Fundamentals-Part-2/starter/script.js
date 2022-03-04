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
// console.log(typeof friends);

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

// const jonasArray = [
// 	"jonas",
// 	"Schmedtmann",
// 	"35",
// 	"teacher",
// 	["Michael", "Peter", "Steven"],
// ];

// const jonas = {
// 	firstName: "Jonas",
// 	lastName: "Schmedtmann",
// 	birthYear: 1976,
// 	calcAge: function () {
// 		// console.log(jonas);
// 		this.age = 2022 - this.birthYear;
// 		return this.age;
// 	},
// 	hasDriversLicense: true,
// 	job: "teacher",
// 	friends: ["Michael", "Steven", "Peter"],
// 	getSummary: function () {
// 		this.calcAge();

// 		return `${this.firstName} is a ${this.age} year old ${
// 			this.job
// 		}, and he ${
// 			this.hasDriversLicense ? "has" : "does't have"
// 		} a driver's license.`;
// 	},
// };

// console.log(jonas);
// console.log(jonas.age());
// console.log(jonas.friends);
// console.log(jonas["firstName"]);

// const nameKey = "Name";
// console.log(jonas["first" + nameKey]);
// console.log(jonas["last" + nameKey]);

// const interestedIn = prompt(
// 	"What do you want to know about Jonas? Choose one from firstName, lastName, age, job or friends"
// );

// jonas.location = "Portugal";
// jonas["twitter"] = "@jonasS";
// console.log(!jonas[interestedIn] ? "Not available" : jonas[interestedIn]);

// console.log(
// 	`${jonas.firstName} has ${jonas.friends.length} friends and his best friend is called ${jonas.friends[0]}.`
// );
// jonas.calcAge();
// jonas.hasDriversLicense = false;
// console.log(jonas.getSummary());

// Loops

// for (let i = 0; i < 10; i++) {
// 	console.log(`Lifting weights, repetition ${i + 1} 🏋️‍♀️`);
// }
// let n = 0;
// while (n < 10) {
// 	console.log(`Lifting weights, repetition ${n + 1} 🏋️‍♀️`);
// 	n++;
// }

// Array Loops

const addResultEle = () => {
	const resultArea = document.querySelector("#result-area");
	let pre = document.createElement("pre");
	pre.id = "result";
	pre.classList.add("col", "shadow", "py-3");

	resultArea.appendChild(pre);
};

const getResultEle = () => {
	const result = document.querySelector("#result");
	if (result) {
		return result;
	} else {
		return false;
	}
};
// const calculate = () => {
// 	let result = getResultEle();
// 	if (!result) {
// 		addResultEle();
// 		result = getResultEle();
// 	}
// 	jonasArray.reverse();
// 	if (result.textContent === "") {
// 		for (const item of jonasArray) {
// 			// console.log(item);
// 			result.textContent += `${item} ${typeof item} \n`;
// 		}
// 	}
// };

// const calculate = () => {
// 	let result = getResultEle();
// 	if (!result) {
// 		addResultEle();
// 		result = getResultEle();
// 	}

// 	let dice = Math.ceil(Math.random() * 6);
// 	while (dice !== 5) {
// 		result.textContent += dice + "\n";
// 		dice = Math.ceil(Math.random() * 6);
// 		if (dice == 5) result.textContent += dice + "\n";
// 	}
// };

const clearBtn = document.querySelector("#clear");
const calculateBtn = document.querySelector("#calculate");

clearBtn.addEventListener("click", () => {
	const result = document.querySelector("#result");
	if (result) {
		result.remove();
	}
});
calculateBtn.addEventListener("click", calculate);

// const jonasArray = [
// 	"Jonas",
// 	"Schmedtmann",
// 	35,
// 	"teacher",
// 	["Michael", "Peter", "Steven"],
// ];

// // const years = [1990, 1976, 1970, 1945];
// // const ages = [];

// // // for (let i = 0; i <= years.length - 1; i++) {
// // // 	const age = 2022 - years[i];
// // // 	ages.push(age);
// // // }

// // for (const year of years) {
// // 	const age = 2022 - year;
// // 	ages.push(age);
// // }

// // console.log(ages);

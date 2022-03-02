// (function () {
// 	var title = "JavaScript Fundamentals – Part 1";
// 	var button = document
// 		.getElementById("button")
// 		.addEventListener("click", function () {
// 			var newTitle = "Hello World";

// 			if (document.getElementById("title").innerText == newTitle) {
// 				newTitle = title;
// 			}
// 			document.getElementById("title").innerText = newTitle;
// 		});
// })();

// document.addEventListener("click", function () {
// 	alert("JS sucks balls");
// });

// let string = "JS is such a fun";
// let boolean = true;
// console.log(typeof boolean);
// console.log(typeof 23);
// console.log(typeof string);

// let somevar = 23;
// somevar = "JS is such a fun";

// console.log(typeof null);

// let age;
// age = 46;

// function trythis() {
// 	console.log(age);
// }

// trythis();
// console.log(age);

// const now = new Date();

// console.log(now.toISOString());

// const firstname = "Petr";
// const surname = "Faitl";
// console.log(firstname + " " + surname);

// const firstname = "Petr";
// const job = "teacher";
// const birthYear = 1967;
// const year = 2022;

// const petr = "I'm " + firstname + " a " + (year - birthYear) + " " + job;

// const petrNew = `I'm ${firstname}, a ${year - birthYear} old ${job}.`;
// console.log(petrNew);

// const petrNewMulti = `
// multiple
// lines
// boo

// `;

// console.log(petrNewMulti);

// const age = 17;
// const isOldEnough = age >= 18;

// if (isOldEnough) {
// 	console.log(`Can drive`);
// } else {
// 	const yearsLeft = 18 - age;
// 	console.log(`Can't drive yet. Wait another ${yearsLeft} years.`);
// }

// console.log(isOldEnough ? `Can drive` : `Can't drive yet.`);

//type conversion
// console.log(typeof Number("23"));

// // Type coercion
// const age = 17;
// console.log(`He is ${age} years old.`);

// let n = "1" + 1; // '11'
// n = n - 1;
// console.log(n);

/*
// Truthy, Falsy
*/

// Five falsy values
// 0, '', undefined, null, NaN
// let jonas;

// console.log(Boolean(0)); //zero
// console.log(Boolean("")); //empty string
// console.log(Boolean(undefined));
// console.log(Boolean({})); //empty object
// console.log(Boolean(jonas)); //undefined

// Truthy

// const height = "0";

// if (height || height == 0) {
// 	console.log(`Height is DEFINED!`);
// } else {
// 	console.log(`Height is UNDEFINED!`);
// }

// const age = "18";
// if (age == 18) console.log("You just became an adult :D");

// Boolean logic
// const hasDrivngLicense = true;
// const hasGoodVision = false;

// const victorianSlang = [
// 	{
// 		term: "doing the bear",
// 		found: true,
// 		popularity: 108,
// 	},
// 	{
// 		term: "katterzem",
// 		found: false,
// 		popularity: null,
// 	},
// 	{
// 		term: "bone shaker",
// 		found: true,
// 		popularity: 609,
// 	},
// 	{
// 		term: "smothering a parrot",
// 		found: false,
// 		popularity: null,
// 	},
// 	{
// 		term: "damfino",
// 		found: true,
// 		popularity: 232,
// 	},
// 	{
// 		term: "rain napper",
// 		found: false,
// 		popularity: null,
// 	},
// 	{
// 		term: "donkey’s breakfast",
// 		found: true,
// 		popularity: 787,
// 	},
// 	{
// 		term: "rational costume",
// 		found: true,
// 		popularity: 513,
// 	},
// 	{
// 		term: "mind the grease",
// 		found: true,
// 		popularity: 154,
// 	},
// ];

// function found(item) {
// 	return item.found;
// }

// function sum(runningTotal, item) {
// 	return runningTotal + item.popularity;
// }

// const foundVictorianSlangs = victorianSlang.filter(found);
// const avg = foundVictorianSlangs.reduce(sum, 0) / foundVictorianSlangs.length;

// // console.log(foundVictorianSlangs);
// console.log(avg);

// const heroes = [
// 	{ name: "Hulk", strength: 90000 },
// 	{ name: "Spider-Man", strength: 25000 },
// 	{ name: "Hawk Eye", strength: 136 },
// 	{ name: "Thor", strength: 100000 },
// 	{ name: "Black Widow", strength: 136 },
// 	{ name: "Vision", strength: 5000 },
// 	{ name: "Scarlet Witch", strength: 60 },
// 	{ name: "Mystique", strength: 120 },
// 	{ name: "Namora", strength: 75000 },
// 	{ name: "Captain America", strength: 362 },
// 	{ name: "Deadpool", strength: 1814 },
// 	{ name: "Black Panther", strength: 1814 },
// ];

// let findHighest = heroes.reduce(function (total, element) {
// 	return Math.max(total, element.strength);
// }, 0);

// console.log(typeof heroes[0].name);

// console.log(findHighest);

// const heroNames = heroes.map((e) => e.name);
// console.log(heroNames.includes("Thor"));

// function getStrength(hero) {
// 	return hero.strength >= 250;
// }
// function logStrength(hero) {
// 	console.log(`Hero's name: ${hero.name} is ${hero.strength} strong`);
// }

// // console.log(heroes.filter(getStrength));

// function getName(hero) {
// 	return hero.name;
// }

// const heroNames = heroes.map(getName).join(", ");
// // console.log(heroNames);

// function addStrength(hero) {
// 	return (hero.strength += 500);
// }

// heroes.every(addStrength);

// console.log(heroes.forEach(logStrength));

// const print = function (number) {
// 	console.log(`priting... ${number}`);

// 	return true;
// };

// console.log(print(1));

/*
let countries = {
	czechrepublic: {
		name: "Czech Republic",
		population: 10000000,
		isIsland: false,
		language: "Czech",
	},
	slovakia: {
		name: "Slovakia",
		population: 5000000,
		isIsland: false,
		language: "Slovak",
	},
	uk: {
		name: "UK",
		population: 60000000,
		isIsland: true,
		language: "English",
	},
	france: {
		name: "France",
		population: 50000000,
		isIsland: false,
		language: "French",
	},
	germany: {
		name: "Germany",
		population: 600000000,
		isIsland: false,
		language: "German",
	},
}; 
*/

// countries.forEach((element, index, array) => {
// 	console.log("position " + index + ": " + element);
// });

// console.log(countries.shift());
// console.log(countries.Czechrepublic.population);

// let markWeight = 95; // 78;
// let markHeight = 1.88; //1.69;
// let markBmi = bmi(markWeight, markHeight);

// let johnWeight = 85; //95;
// let johnHeight = 1.76; //1.95;
// let johnBmi = bmi(johnWeight, johnHeight);

// let markHigherBMI = markBmi > johnBmi;

// function bmi(weight, height) {
// 	return Math.round(weight / height ** 2);
// }

// console.log(markHigherBMI);

// CODING CHALLENGE 2
// function round(n, precission = 0) {
// 	const multiplier = 10 ** precission;
// 	return Math.round(n * multiplier) / multiplier;
// }

// const form = document.getElementById("form");
// document.getElementById("button").addEventListener("click", function () {
// 	let data = new FormData(form);
// 	let formObj = {
// 		bmi1: function () {
// 			return round(this.weight1 / this.height1 ** 2, 2);
// 		},
// 		bmi2: function () {
// 			return round(this.weight2 / this.height2 ** 2, 2);
// 		},
// 		compareBmi: function () {
// 			return this.bmi1() > this.bmi2()
// 				? `${this.name1}'s BMI is ${this.bmi1()}. That's ${round(
// 						this.bmi1() - this.bmi2(),
// 						2
// 				  )} greater than ${this.name2}'s, which is ${this.bmi2()}.`
// 				: `${this.name2}'s BMI ${this.bmi2()}. That's is ${round(
// 						this.bmi2() - this.bmi1(),
// 						2
// 				  )} greater than ${this.name1}'s, which is  ${this.bmi1()}.`;
// 		},
// 	};
// 	for (var pair of data.entries()) {
// 		formObj[pair[0]] = pair[1];
// 	}
// 	if (formObj.bmi1()) {
// 		let result = formObj.compareBmi();
// 		document.getElementById("title").innerText = result;
// 	}
// });

// const dolphins = [97, 112, 101];
// const koalas = [109, 95, 106];

// let dolphinsMean = (sum =
// 	dolphins.reduce(function (result, e) {
// 		return result + e;
// 	}) / dolphins.length);

// let koalasMean = (sum =
// 	koalas.reduce(function (result, e) {
// 		return result + e;
// 	}) / koalas.length);

// if (koalasMean > dolphinsMean && koalasMean >= 100) {
// 	console.log(`Koalas win!`);
// } else if (dolphinsMean > koalasMean && dolphinsMean >= 100) {
// 	console.log(`Dolphins win!`);
// } else if (koalasMean >= 100 && dolphinsMean >= 100) {
// 	console.log(`It's a draw!`);
// } else {
// 	console.log(`No one wins :(`);
// }
const billAmount = 275;
const tipPerc = [0.15, 0.2];

function calculateTip(amount) {
	const tip =
		amount >= 50 && amount <= 300
			? amount * tipPerc[0]
			: amount * tipPerc[1];
	const total = amount + tip;
	return [amount, tip, total];
}

let tip = {
	billAmount: billAmount,
	tipPerc: { low: 0.15, high: 0.2 },
	tipVal: 0,
	calculateTip: function (amount) {
		this.tipVal =
			amount >= 50 && amount <= 300
				? amount * this.tipPerc.low
				: amount * this.tipPerc.high;
		this.total = amount + this.tipVal;
		console.log(
			`The bill was $${this.billAmount}, the tip was $${this.tipVal}, and the total value was $${this.total}`
		);
	},
	total: 0,
};

// console.log(calculateTip(275));

// console.log(
// 	`The bill was ${calculateTip(billAmount)[0]}, the tip was ${
// 		calculateTip(billAmount)[1]
// 	}, and the total value was ${calculateTip(billAmount)[2]}`
// );

tip.calculateTip(tip.billAmount);
// console.log(tip.billAmount);
// console.log(tip.tipVal);
// console.log(tip.total);

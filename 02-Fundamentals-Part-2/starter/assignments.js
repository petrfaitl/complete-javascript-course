// const dolphinScores = [44, 23, 71];
// const koalasScores = [65, 54, 49];
// const dolphinScores = [85, 54, 41];
// const koalasScores = [23, 34, 27];

// const calcAverage = (scores) => {
// 	let average =
// 		scores.reduce(function (total, element) {
// 			return (total += element);
// 		}, 0) / scores.length;
// 	return average;
// };

// function checkWinner(name1, avg1, name2, avg2) {
// 	let winner, loser;
// 	if (avg1 > avg2 * 2) {
// 		winner = [name1, avg1];
// 		loser = [name2, avg2];
// 	} else if (avg2 > avg1 * 2) {
// 		loser = [name1, avg1];
// 		winner = [name2, avg2];
// 	} else {
// 		return `No-one wins.`;
// 	}

// 	return `${winner[0]} wins (${winner[1]} vs. ${loser[1]})`;
// }

// const dolphinAvg = calcAverage(dolphinScores);

// const koalasAvg = calcAverage(koalasScores);

// console.log(
// 	checkWinner(
// 		"Dolphins",
// 		calcAverage(dolphinScores),
// 		"Koalas",
// 		calcAverage(koalasScores)
// 	)
// );

// console.log(checkWinner("Foo", 55, "bar", 22));

// const bills = [125, 555, 44];

// let tips = new Array();
// let totals = new Array();

// const calcTip = function (value) {
// 	const tip = value >= 50 && value <= 300 ? value * 0.15 : value * 0.2;
// 	tips.push(tip);
// 	totals.push(value + tip);
// };
// // console.log(calcTip(300));

// bills.forEach(calcTip);

// console.log(bills);
// console.log(tips);
// console.log(totals);

// let mark = {
// 	firstName: "Mark",
// 	lastName: "Miller",
// 	mass: 78,
// 	height: 1.68,
// 	calcBMI: function () {
// 		this.bmi = Number(this.mass / this.height ** 2).toFixed(2);
// 		return this.bmi;
// 	},
// };

// let john = {
// 	firstName: "John",
// 	lastName: "Smith",
// 	mass: 30,
// 	height: 1.55,
// 	calcBMI: function () {
// 		this.bmi = Number(this.mass / this.height ** 2).toFixed(2);
// 		return this.bmi;
// 	},
// };
// // const bmiMark = mark.calcBMI();
// // const bmiJohn = john.calcBMI();

// function compareBmi(person1, person2) {
// 	console.log(person1.calcBMI());
// 	console.log(person2.calcBMI());

// 	if (person1.calcBMI() > person2.calcBMI()) {
// 		return `${person1.firstName}'s BMI (${person1.bmi}) is higher than ${person2.firstName} (${person2.bmi}).`;
// 	} else if (person1.bmi < person2.bmi) {
// 		return `${person2.firstName} BMI (${person2.bmi}) is higher than ${person1.firstName} (${person1.bmi}).`;
// 	} else {
// 		return `${person2.firstName} BMI (${person2.bmi}) is the same as ${person1.firstName} (${person1.bmi}).`;
// 	}
// }

// // console.log(compareBmi(mark, john));
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const calcTip = (value) => {
	let tip;
	if (value >= 50 && value <= 300) {
		tip = value * 0.15;
	} else {
		tip = value * 0.2;
	}
	return tip;
};

for (const bill of bills) {
	tips.push(calcTip(bill));
	console.log(
		`Total bill of $${(bill + calcTip(bill)).toFixed(2)} (tip $${calcTip(
			bill
		).toFixed(2)})`
	);
}

const calcAverage = (arr) => {
	let total = 0;
	for (const item of arr) {
		total += item;
	}
	return total / bills.length;
};

const calcAverage2 = (arr) => {
	const avg =
		arr.reduce((total, bill) => {
			return (total += bill);
		}, 0) / arr.length;
	return avg;
};

console.log(tips);
console.log(calcAverage(bills));
console.log(calcAverage(tips));
console.log(calcAverage2(bills));
console.log(calcAverage2(tips));

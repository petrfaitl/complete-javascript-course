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

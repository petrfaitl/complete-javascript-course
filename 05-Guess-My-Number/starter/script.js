"use strict";

let message = document.querySelector(".message");

let displayNumber = document.querySelector(".number");
const startScore = 20;
let score = startScore;
let highScore = document.querySelector(".highscore");
let highScoreVal = Number(highScore.textContent);

const checkBtn = document.getElementsByClassName("check btn")[0];
const againBtn = document.getElementsByClassName("btn again")[0];

let tries = 0;

const checkValue = () => {
	tries++;

	const guess = Number(document.querySelector(".guess").value);

	// console.log(secretNumber);
	if (score > 1) {
		if (!guess) {
			message.textContent = "⛔️ No number!";
			decreaseScore();
		} else if (guess === secretNumber) {
			decreaseScore();
			displayNumber.textContent = secretNumber;
			message.textContent = "🥳 Correct answer!";
			if (highScoreVal < score) {
				console.log(highScoreVal, score);
				highScore.textContent = score;
				highScoreVal = score;
			}
			document.querySelector("body").style.backgroundColor = "#60b347";
			checkBtn.setAttribute("disabled", "disabled");
		} else if (guess > secretNumber) {
			message.textContent = "👇 Too high, try lower!";
			decreaseScore();
		} else if (guess < secretNumber) {
			message.textContent = "👆 Too low, try higher!";
			decreaseScore();
		}
	} else {
		decreaseScore();
		message.textContent = "💥 You lost the game!";
		checkBtn.setAttribute("disabled", "disabled");
	}
};
checkBtn.addEventListener("click", checkValue);

const playAgain = () => {
	secretNumber = randNumber();
	document.querySelector(".score").textContent = startScore;
	message.textContent = "Start guessing...";
	displayNumber.textContent = "?";
	document.querySelector(".guess").value = "";
	document.querySelector("body").style.backgroundColor = "#222";
	checkBtn.removeAttribute("disabled");
	score = startScore;
};

againBtn.addEventListener("click", playAgain);

const randNumber = function () {
	return Number.parseInt(Math.random() * 19 + 1);
};
let secretNumber = randNumber();
// console.log(secretNumber);

const decreaseScore = function () {
	score--;
	document.querySelector(".score").textContent = score;
};

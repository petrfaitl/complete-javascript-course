"use strict";

let displayNumber = document.querySelector(".number");
const startScore = 20;
let score = startScore;
let highScore = document.querySelector(".highscore");
let highScoreVal = 0;

const checkBtn = document.getElementsByClassName("check btn")[0];
const againBtn = document.getElementsByClassName("btn again")[0];

let tries = 0;

const checkValue = () => {
	tries++;

	const guess = Number(document.querySelector(".guess").value);

	if (score > 1) {
		if (!guess) {
			displayMessage("⛔️ No number!");
			decreaseScore();
		} else if (guess === secretNumber) {
			decreaseScore();
			displayNumber.textContent = secretNumber;
			displayMessage("🥳 Correct answer!");
			if (highScoreVal < score) {
				highScore.textContent = score;
				highScoreVal = score;
			}
			document.querySelector("body").style.backgroundImage =
				"linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)";

			displayNumber.style.width = "30rem";
			checkBtn.setAttribute("disabled", "disabled");
		} else if (guess !== secretNumber) {
			guess > secretNumber
				? displayMessage("👇 Too high, try lower!")
				: displayMessage("👆 Too low, try higher!");
			decreaseScore();
		}
	} else {
		decreaseScore();
		displayMessage("💥 You lost the game!");
		checkBtn.setAttribute("disabled", "disabled");
	}
};
checkBtn.addEventListener("click", checkValue);

const playAgain = () => {
	secretNumber = randNumber();
	document.querySelector(".score").textContent = startScore;
	// message.textContent = "Start guessing...";
	displayMessage("Start guessing...");
	displayNumber.textContent = "?";
	document.querySelector(".guess").value = "";
	document.querySelector("body").style.backgroundColor = "none";
	document.querySelector("body").style.backgroundImage = "";
	displayNumber.style.width = "15rem";
	checkBtn.removeAttribute("disabled");
	score = startScore;
};

againBtn.addEventListener("click", playAgain);

const randNumber = function () {
	return Number.parseInt(Math.random() * 19 + 1);
};
let secretNumber = randNumber();

const decreaseScore = function () {
	score--;
	document.querySelector(".score").textContent = score;
};

const displayMessage = function (txt) {
	document.querySelector(".message").textContent = txt;
};

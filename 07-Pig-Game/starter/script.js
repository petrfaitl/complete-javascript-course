'use strict';

// Selecting Elements

const data = {
  scores: null,
  currentScore: null,
  activePlayer: null,
  maxScore: null,
  playing: true,
  init: function () {
    this.scores = [0, 0];
    this.currentScore = 0;
    this.activePlayer = 0;
    this.maxScore = 10;
    this.playing = true;
  },
};

const view = {
  score0El: document.querySelector('#score--0'),
  score1El: document.querySelector('#score--1'),
  curScore0El: document.querySelector('#current--0'),
  curScore1El: document.querySelector('#current--1'),
  rollDiceBtn: document.querySelector('.btn--roll'),
  dice: document.querySelector('.dice'),
  newGameBtn: document.querySelector('.btn--new'),
  holdBtn: document.querySelector('.btn--hold'),
  players: document.querySelectorAll('.player'),

  init: function () {
    this.dice.classList.add('hidden');
    this.players.forEach(e => e.classList.remove('player--winner'));
    this.setGamePlaying();
    this.setCurrentScore(0);
    this.setCurrentScore(1);
    this.setTotalScore(0);
    this.setTotalScore(1);
    this.setActivePlayer();
  },
  showEl: function (el) {
    if (el.classList.contains('hidden')) el.classList.remove('hidden');
  },
  displayDiceNumber: function (n) {
    this.dice.setAttribute('src', `dice-${n}.png`);
  },
  setCurrentScore: function (player) {
    let currentEl = this[`curScore${player}El`];
    const currentScore = data.currentScore;
    currentEl.textContent = currentScore;
  },
  setTotalScore: function (player) {
    let currentEl = this[`score${player}El`];
    const totalScore = data.scores[player];
    currentEl.textContent = totalScore;
  },
  setActivePlayer: function () {
    this.players.forEach(function (el, index) {
      if (index === data.activePlayer) {
        el.classList.add('player--active');
      } else {
        el.classList.remove('player--active');
      }
    });
  },
  setPlayerWinner: function (player) {
    this.players[player].classList.add('player--winner');
    this.players[player].classList.remove('player--active');
    this.dice.classList.add('hidden');
  },
  setGamePlaying: function () {
    if (!data.playing) {
      this.rollDiceBtn.setAttribute('disabled', 'disabled');
      this.holdBtn.setAttribute('disabled', 'disabled');
    } else if (this.rollDiceBtn.getAttribute('disabled')) {
      this.rollDiceBtn.removeAttribute('disabled');
      this.holdBtn.removeAttribute('disabled');
    }
  },
};

const controller = {
  init: function () {
    data.init();
    view.init();
  },
  roll: function () {
    view.showEl(view.dice);
    const numberRolled = Math.trunc(Math.random() * 6) + 1;
    view.displayDiceNumber(numberRolled);
    if (numberRolled !== 1) {
      data.currentScore += numberRolled;
      view.setCurrentScore(data.activePlayer);
    } else {
      data.currentScore = 0;
      view.setCurrentScore(data.activePlayer);
      controller.toggleActivePlayer();
    }
  },
  toggleActivePlayer: function () {
    let activePlayer = data.activePlayer;
    data.activePlayer = activePlayer == 0 ? 1 : 0;
    view.setActivePlayer();
  },
  newGame: function () {
    controller.init();
    view.init();
  },
  holdScore: function () {
    const active = data.activePlayer;
    data.scores[active] += data.currentScore;
    data.currentScore = 0;
    view.setCurrentScore(active);
    view.setTotalScore(active);
    if (data.scores[active] >= data.maxScore) {
      view.setPlayerWinner(active);
      data.playing = false;
      view.setGamePlaying();
    } else {
      // console.log(this);
      controller.toggleActivePlayer();
    }
  },
};

controller.init();
console.log(controller);

view.rollDiceBtn.addEventListener('click', controller.roll);
view.newGameBtn.addEventListener('click', controller.newGame);
view.holdBtn.addEventListener('click', controller.holdScore);

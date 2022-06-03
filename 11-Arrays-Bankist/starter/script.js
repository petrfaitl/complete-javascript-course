'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: ['2022-05-13T21:31:17.178Z', '2021-12-23T07:42:02.383Z', '2022-05-11T21:31:17.178Z', '2021-04-01T10:17:24.185Z', '2020-05-08T14:11:59.604Z', '2020-05-27T17:01:17.194Z', '2020-07-11T23:36:17.929Z', '2020-07-12T10:51:36.790Z',],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: ['2022-01-01T13:15:33.035Z', '2019-11-30T09:48:16.867Z', '2019-12-25T06:04:23.907Z', '2020-01-25T14:18:46.235Z', '2020-02-05T16:33:06.386Z', '2020-04-10T14:43:26.374Z', '2020-06-25T18:49:59.371Z', '2020-07-26T12:01:20.894Z',],
    currency: 'CZK',
    locale: 'cs-CS',
};

// No _movements in these accounts

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

// const accounts = [account1, account2, account3, account4];
const accounts = [account1, account2];

const createUsername = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner.toLowerCase().split(' ')
                          .reduce((prev, el) => prev + el.at(0), '')
    })
};

createUsername(accounts);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('._movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const calcDaysPassed = (date1, date2) => Math.floor(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));

const displayDate = function (date, locale) {
    const now = new Date();
    const daysAgo = calcDaysPassed(now, date);
    switch (true) {
        case (daysAgo === 0):
            return 'today';
        case(daysAgo === 1):
            return 'yesterday';
        case(daysAgo <= 7):
            return `${daysAgo} days ago`;
        default:
            return date.toLocaleDateString(locale);
    }
}

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';
    const moves = sort ? acc.movements.slice()
                            .sort((a, b) => a - b) : acc.movements;
    // console.log(moves);

    moves?.forEach(function (mov, i) {
        const date = new Date(acc.movementsDates[i]);

        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const rowClass = i % 2 === 0 ? 'even' : '';
        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate(date, acc.locale)}</div>
          <div class="movements__value">${formatCurrency(mov, acc.locale, acc.currency)}</div>
        </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin', html);

    })
}
const updateUI = function (acc) {
    calculatePrintBalance(acc);
    calcPrintDeposits(acc);
    calcPrintWithdrawals(acc);
    calculatePrintInterest(acc);
    displayMovements(acc);
    setCurrentDate(acc);

}
const transferMoney = function (event) {
    event.preventDefault();

    const transferTo = inputTransferTo.value;
    const transferAmount = Number(Number(inputTransferAmount.value).toFixed(2));
    // console.log(typeof transferAmount);
    intervalID = startLogOutTimer();

    const targetAccount = accounts.find(acc => acc.username === transferTo);
    // console.log(this);

    if (transferAmount > 0 && (this.balance - transferAmount) < 0) {
        alert('Sorry, you do not have sufficient funds for intended money transfer.')
    } else {
        if (targetAccount && targetAccount.username !== this.username) {
            targetAccount.movements.push(transferAmount);
            targetAccount.movementsDates.push(new Date().toISOString());
            this.movements.push(-transferAmount);
            this.movementsDates.push(new Date().toISOString());
            updateUI(this);

            inputTransferTo.value = inputTransferAmount.value = '';

        }
    }

}
const calculatePrintBalance = function (acc) {

    acc.balance = acc.movements?.reduce((acc, el) => acc + Number(el), 0) || '0';
    labelBalance.textContent = formatCurrency(acc.balance, acc.locale, acc.currency);
};

const deposit = mov => mov > 0;
const withdrawal = mov => mov < 0;

const calcPrintDeposits = function (acc) {
    const deposits = acc.movements?.filter(deposit)
                        .reduce((tot, el) => tot + Number(el), 0) || '0';
    labelSumIn.textContent = formatCurrency(deposits, acc.locale, acc.currency);
}

const calcPrintWithdrawals = function (acc) {
    const withdrawals = acc.movements?.filter(withdrawal)
                           .reduce((tot, withdraw) => tot + Math.abs(withdraw), 0) || '0';
    labelSumOut.textContent = formatCurrency(withdrawals, acc.locale, acc.currency);
}
const calculatePrintInterest = function (acc) {
    const interest = acc.movements?.filter(deposit)
                        .map(dep => Math.round(dep * acc.interestRate) / 100)
                        .filter(int => int > 1)
                        .reduce((tot, int) => tot + int, 0) || '0';
    labelSumInterest.textContent = formatCurrency(interest, acc.locale, acc.currency);
}
let sorted = false;
const sortMovements = function () {
    displayMovements(this, !sorted);
    sorted = !sorted;
    intervalID = startLogOutTimer();
}
const eurToUsd = 1.1;
const depositsUSD = function (movements) {
    return movements.filter(deposit).map(mov => mov * eurToUsd)
                    .reduce((acc, mov) => acc + mov, 0);
}
const formatCurrency = function (value, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency', currency: currency
    }).format(value);
}
const requestLoan = function (event) {
    event.preventDefault();
    const loanValue = Math.floor(inputLoanAmount.value);
    const minMovement = this.movements.some(mov => mov >= Number(loanValue) * 0.1);

    if (minMovement && Number(loanValue) > 0) {
        setTimeout(() => {
            this.movements.push(loanValue);
            this.movementsDates.push(new Date().toISOString());
            updateUI(this);
        }, 5000);
    }
    intervalID = startLogOutTimer();
    inputLoanAmount.value = '';

}
const logOutUser = function () {
    clearSession();
    updateUI({});
    location.reload();
}
const closeAccount = function (event) {
    event.preventDefault();
    const user = inputCloseUsername.value;
    const pin = Number(inputClosePin.value);

    inputCloseUsername.value = inputClosePin.value = '';

    const userConfirm = prompt(`Are you sure? To close your account type DELETE?`)
    if (this.username === user && this.pin === pin && userConfirm === 'DELETE') {
        const accIndex = accounts.findIndex(el => el.username === this.username);
        accounts.splice(accIndex, 1);
        logOutUser();

    }
}

const setCurrentDate = function (acc) {
    const now = new Date();
    const options = {
        dateStyle: 'short', timeStyle: 'short'
    };

    labelDate.textContent = new Intl.DateTimeFormat(acc.locale, options).format(now);
}

const timeOfDayGreeting = function (account) {
    const firstName = account.owner.split(' ')[0];
    const time = new Date().getHours();
    let greeting = 'Good evening';
    switch (time) {
        case time < 12:
            greeting = 'Good morning';
            break;
        case time > 12 && time < 19:
            greeting = 'Good afternoon';
            break;

    }
    labelWelcome.textContent = `${greeting} ${firstName}!`;

}

const startLogOutTimer = function () {
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = 0;
    }
    let time = 300;
    const tick = function () {
        const min = String(Math.floor(time / 60)).padStart(2, '0');
        const secs = String(time % 60).padStart(2, '0');
        labelTimer.textContent = `${min}:${secs}`;

        // debugger;
        if (time === 0) {
            clearInterval(timer);
            intervalID = 0;
            logOutUser();
        }
        time--;
    }
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
}
let intervalID = 0;
const setUI = function (account) {

    containerApp.style.opacity = 1;
    timeOfDayGreeting(account);
    intervalID = startLogOutTimer();

    updateUI(account);

    btnSort.addEventListener('click', sortMovements.bind(account));
    btnTransfer.addEventListener('click', transferMoney.bind(account));
    btnClose.addEventListener('click', closeAccount.bind(account));
    btnLoan.addEventListener('click', requestLoan.bind(account));

}

const clearSession = function () {
    sessionStorage.clear();
}

const validateUser = function (event) {
    event.preventDefault();

    let user = sessionStorage.getItem('user') || '';
    let pass = atob(sessionStorage.getItem('pass')) || '';
    let res;
    if (event.type === 'click') {
        user = inputLoginUsername.value;
        pass = inputLoginPin.value;
    }

    res = accounts.find(el => el.username === user && el.pin === Number(pass));

    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    if (res) {
        sessionStorage.setItem('user', user);
        sessionStorage.setItem('pass', btoa(pass));
        setUI(res);

    } else {
        clearSession();
        if (event.type === 'click') {
            alert('Incorrect user name or PIN or user does not exist. Please try again');
        }

    }

}
btnLogin.addEventListener('click', validateUser);
window.addEventListener('load', validateUser);
window.addEventListener('load', function () {
    document.querySelectorAll('.movements__row').forEach((row, idx) => {
        idx % 2 === 1 ? row.style.backgroundColor = 'rgba(46, 191, 186, 0.05)' : '';
    })
});
document.addEventListener('mousemove', (e) => {
    intervalID = startLogOutTimer();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const userCurrency = '$';
const currencies = new Map([['USD', 'United States dollar'], ['EUR', 'Euro'], ['GBP', 'Pound sterling'], ['NZD', 'New Zealand Dollar'],]);
// const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementsDescriptions = movements.map(function (el, i) {
    return `Movement ${i + 1}: You ${el > 0 ? 'deposited' : 'withdrew'} ${Math.abs(el)}`;

});

/////////////////////////////////////////////////-

// SLICE
let a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
// console.log(a.slice(4,5));
// console.log(a.slice(-2));

// SPLICE
let b = [1, 2, 3, 4, 5];
// console.log(a.splice(2,b.length,...b));
// console.log(a);

// REVERSE
let a2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
// console.log(a2.reverse());
// console.log(a2);

// CONCAT
const letters = a.concat(a2);
// console.log(letters);

// JOIN
// console.log(a.join(' - '));

// AT method
// console.log(a.at(a.length-1));
// console.log(a.slice(-1)[0]);
//
// console.log(a.at(-1));

// _movements.forEach((a,i) => {
//   if(a>0){
//     console.log(`Movement ${i}: You have deposited $ ${a}`);
//   }else{
//     console.log(`Movement ${i}: You have withdrawn $ ${Math.abs(a)}`);
//
//   }
// });

// currencies.forEach((val, key,arr)=> console.log(`${key}: ${val}`) )

// const accountMovements = accounts.map(acc => acc._movements).flat();
// console.log(accountMovements.filter(deposit), accountMovements.filter(deposit).reduce((tot, dep) => tot + dep, 0));
// console.log(accountMovements.filter(withdrawal), accountMovements.filter(withdrawal)
//                                                                  .reduce((tot, withdraw) => tot + withdraw, 0));

// console.log(accountMovements.reduce((sum, mov) => sum + mov, 0));

// flatMap method; maps several arrays to one array and flattens them from subarrays.
// const overallDeposits = accounts.flatMap(acc => acc._movements).reduce((tot, mov) => tot + mov, 0);
// console.log(overallDeposits);

// Fill method
// console.log([1, 2, 3]);
// console.log(new Array(7).fill(1, 3));

// From method; apply it on Array constructor; callback like in map method.
// const x = Array.from({ length: 7 }, () => 1);
// console.log(x);
//
// const y = Array.from({ length: 7 }, (_, idx) => idx + 1);
// console.log(y);
//
// const randomDiceRolls = Array.from({ length: 100 }, () => Math.floor(Math.random() * 6 + 1));
// console.log(randomDiceRolls);

// Array.from array like object
// window.addEventListener('load', function () {
//     const movementValues = document.querySelectorAll('.movements__value');
//
//     const movementsUIBalance = Array.from({ length: movementValues.length }, (_, i) => movementValues[i].textContent)
//                                     .map(el => el.replace('$', '')).reduce((tot, el) => tot + Number(el), 0);
//
//     const movementsUIBalance2 = Array.from(movementValues, (el => el.textContent.replace('$', '')))
//                                      .reduce((tot, el) => tot + Number(el), 0);
//     console.log(movementsUIBalance2);
// });

const randDice = function () {
    return Math.floor(Math.random() * 6);
}
const data = [0, 1, 2]
const rollArr = Array.from({ length: 300 }, randDice);
let frequency = Array.from({ length: 6 }, () => 0);
rollArr.forEach((roll) => {
    frequency[roll]++;
})
// console.log(frequency);

// console.log(typeof (+'33'));
// Numeric separators

// const diameter = 287_400_000_000;
// console.log(diameter);
//
// const priceCents = 35_99;
// console.log(priceCents);

// BigInt

// console.log(Number.MAX_SAFE_INTEGER); //64 bits max less decimal points, etc results in max 53 bits
// console.log(276847563864523572375097070n); // BigInt

//operations with BigInt; have to convert all to BigInt

// Dates
// console.log('####### DATES #########');
//
const now = new Date();
//
// console.log(now);
// console.log(new Date('Sun May 15 2022 14:10:09'));
// console.log(new Date('15 december 2022'));
// console.log(new Date(2023, 11, 1, 23, 15, 5));
//
const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.toLocaleDateString());
// console.log(future.getTime());
// console.log(Date.now());

// const calcDaysPassed = (date1, date2) => ((date2 - date1) / (24 * 60 * 60 * 1000 * 365));
// console.log(daysPassed(now, future));

// Set timeout
// const ingredients = ['olives', 'spinach'];
// const pizzaTimer = setTimeout((ing1, ing2) => console.log(`here is your pizza with ${ing1} and ${ing2} 🍕`), 2000, ...ingredients);
// console.log('Waiting...');
//
// if (ingredients.includes('spinach')) {
//     clearTimeout(pizzaTimer);
// }

// setInterval
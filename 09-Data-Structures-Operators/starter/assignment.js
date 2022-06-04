///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
*/

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};
// 1
// const [...players1] = game.players[0];
// const [...players2] = game.players[1];
const [players1, players2] = game.players;
// console.log(players1);
// console.log(players2);

// 2
const [gk1, ...fieldPlayers1] = players1;
const [gk2, ...fieldPlayers2] = players2;

// console.log(gk1, fieldPlayers1);
// console.log(gk2, fieldPlayers2);

// 3

const players = [...players1, ...players2];
// console.log(players);

// 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// 5

const {team1, x: draw, team2} = game.odds;
// console.log(team1, draw, team2);

// 6
const printGoals = function (...players) {
    console.log(`Goals scored: ${players.length}`);
};

// printGoals('Davies', 'Muller');
// printGoals(...game.scored);

// 7
// team1 < team2 && console.log('Team 1 is more likely to win');
// team1 > team2 && console.log('Team 2 is more likely to win');

// const odds = [team1, team2];
// const res = Math.min(...odds);
// const oddsOn = el => el === res;
// console.log(`Team ${odds.findIndex(oddsOn) + 1} is more likely to win.`);

// Narcisistic number
// A Narcissistic Number is a positive number which is the sum of its own digits, each raised to the power of the number of digits in a given base. In this Kata, we will restrict ourselves to decimal (base 10).

// For example, take 153 (3 digits), which is narcisstic:

// 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
// and 1652 (4 digits), which isn't:

// 1^4 + 6^4 + 5^4 + 2^4 = 1 + 1296 + 625 + 16 = 1938

// Code me to return true or false
// function narcissistic(value) {
//   return (
//     value ===
//     [...String(value)].reduce((prev, element, index, arr) => {
//       prev += Math.pow(Number(element), arr.length);
//       return prev;
//     }, 0)
//   );
// }

// console.log(narcissistic(153));
// console.log(narcissistic(1652));

// Digital root

// Digital root is the recursive sum of all the digits in a number.

// Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.

// Examples
//     16  -->  1 + 6 = 7
//    942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
// 132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
// 493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2

// function digitalRoot(val) {
//   const sum = [...String(val)].reduce((tot, el) => (tot += Number(el)), 0);

//   if ([...String(val)].length > 1) {
//     return digitalRoot(sum);
//   } else {
//     return sum;
//   }
// }
// console.log(digitalRoot(493193));

//  ISBN 13 checksum

// function isbn13Check(val) {
//   const arr = [...String(val)];
//   const sum = arr.slice(0, 12).reduce((tot, cur, ind) => {
//     const mult = ind % 2 == 0 || ind === 0 ? 1 : 3;
//     return (tot += cur * mult);
//   }, 0);
//   return sum % 10 && 10 - (sum % 10) == arr.slice(12, 13);
// }

// console.log(isbn13Check(9781861972712));
// console.log(isbn13Check(9781681972712));

//
// Your order please

// Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result.

// Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).

// If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.

// Examples
// "is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
// "4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"
// ""  -->  ""

function order(words) {
    const arr = words.split(' ');
    arr.sort((a, b) => {
        const regex = /\d/;
        return a.match(regex) - b.match(regex);
    });
    return arr.join(' ');
}

// console.log(order('is2 Thi1s T4est 3a'));

// Equal sides of an array

// You are going to be given an array of integers. Your job is to take that array and find an index N where the sum of the integers to the left of N is equal to the sum of the integers to the right of N. If there is no index that would make this happen, return -1.

// For example:

// Let's say you are given the array {1,2,3,4,3,2,1}:
// Your function will return the index 3, because at the 3rd position of the array, the sum of left side of the index ({1,2,3}) and the sum of the right side of the index ({3,2,1}) both equal 6.

// Let's look at another one.
// You are given the array {1,100,50,-51,1,1}:
// Your function will return the index 1, because at the 1st position of the array, the sum of left side of the index ({1}) and the sum of the right side of the index ({50,-51,1,1}) both equal 1.

// Last one:
// You are given the array {20,10,-80,10,10,15,35}
// At index 0 the left side is {}
// The right side is {10,-80,10,10,15,35}
// They both are equal to 0 when added. (Empty arrays are equal to 0 in this problem)
// Index 0 is the place where the left side and right side are equal.

// Note: Please remember that in most programming/scripting languages the index of an array starts at 0.

// Input:
// An integer array of length 0 < arr < 1000. The numbers in the array can be any integer positive or negative.

// Output:
// The lowest index N where the side to the left of N is equal to the side to the right of N. If you do not find an index that fits these rules, then you will return -1.

// Note:
// If you are given an array with multiple answers, return the lowest correct index

function findEvenIndex(arr) {
    let result = -1;
    arr.forEach((el, idx, ar) => {
        const sumLeft = ar.slice(0, idx).reduce((sum, el) => sum + el, 0);
        const sumRight = ar
            .slice(idx + 1, ar.length)
            .reduce((sum, el) => sum + el, 0);
        if (sumLeft === sumRight) {
            result = idx;
        }
    });
    return result;
}

// console.log(findEvenIndex([20, 10, -80, 10, 10, 15, 35]));
// console.log(findEvenIndex([1, 2, 3, 4, 3, 2, 1]));
// console.log(findEvenIndex([1, 100, 50, -51, 1, 1]));

// Consequtive strings

// You are given an array(list) strarr of strings and an integer k. Your task is to return the first longest string consisting of k consecutive strings taken in the array.

// Examples:
// strarr = ["tree", "foling", "trashy", "blue", "abcdef", "uvwxyz"], k = 2

// Concatenate the consecutive strings of strarr by 2, we get:

// treefoling   (length 10)  concatenation of strarr[0] and strarr[1]
// folingtrashy ("      12)  concatenation of strarr[1] and strarr[2]
// trashyblue   ("      10)  concatenation of strarr[2] and strarr[3]
// blueabcdef   ("      10)  concatenation of strarr[3] and strarr[4]
// abcdefuvwxyz ("      12)  concatenation of strarr[4] and strarr[5]

// Two strings are the longest: "folingtrashy" and "abcdefuvwxyz".
// The first that came is "folingtrashy" so
// longest_consec(strarr, 2) should return "folingtrashy".

// In the same way:
// longest_consec(["zone", "abigail", "theta", "form", "libe", "zas", "theta", "abigail"], 2) --> "abigailtheta"
// n being the length of the string array, if n = 0 or k > n or k <= 0 return "" (return Nothing in Elm).

// Note
// consecutive strings : follow one after another without an interruption

// function longestConsec(strarr, k) {
//   // debugger;
//   if (strarr.length > 0 && k < strarr.length && k > 0) {
//     // for (let i = 0; i < strarr.length - 1; i++) {
//     const newArr = strarr.map((v, i, a) => {
//       const str = strarr.slice(i, i + k).reduce((a, b) => a + b);

//       return str;
//     });
//     const maxLength = newArr.reduce((prevmax, el) => {
//       return Math.max(prevmax, el.length);
//     }, 0);

//     const longestConsec = newArr.filter(el => {
//       return el.length === maxLength;
//     });
//     // console.log(longestConsec);
//     // const result = newArr.sort((a, b) => b.length - a.length);

//     return longestConsec[0];
//   } else {
//     return '';
//   }
// }

function longestConsec(strarr, k) {
    // debugger;
    if (strarr.length === 0 || k > strarr.length || k <= 0) {
        return '';
    } else {
        const newArr = strarr.map((v, i, a) => {
            const str = strarr.slice(i, i + k).reduce((a, b) => a + b);

            return str;
        });
        const maxLength = newArr.reduce((prevmax, el) => {
            return Math.max(prevmax, el.length);
        }, 0);

        const longestConsec = newArr.filter(el => {
            return el.length === maxLength;
        });

        return longestConsec[0];
    }
}

// console.log(
//   longestConsec(['tree', 'foling', 'trashy', 'blue', 'abcdef', 'uvwxyz'], 2)
// );

// console.log(longestConsec([], 3));
// console.log(longestConsec(['it', 'wkppv', 'ixoyx', '3452', 'zzzzzzzzzzzz'], 3));
// // ixoyx3452zzzzzzzzzzzz
// console.log(longestConsec(['it', 'wkppv', 'ixoyx', '3452', 'zzzzzzzzzzzz'], 0));
// console.log(
//   longestConsec(['it', 'wkppv', 'ixoyx', '3452', 'zzzzzzzzzzzz'], 15)
// );

// Roman numeral decoder

// Create a function that takes a Roman numeral as its argument and returns its value as a numeric decimal integer. You don't need to validate the form of the Roman numeral.

// Modern Roman numerals are written by expressing each decimal digit of the number to be encoded separately, starting with the leftmost digit and skipping any 0s. So 1990 is rendered "MCMXC" (1000 = M, 900 = CM, 90 = XC) and 2008 is rendered "MMVIII" (2000 = MM, 8 = VIII). The Roman numeral for 1666, "MDCLXVI", uses each letter in descending order.

// Example:

// solution('XXI'); // should return 21
// Help:

// Symbol    Value
// I          1
// V          5
// X          10
// L          50
// C          100
// D          500
// M          1,000

function solution(roman) {
    const values = {I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000};
    let sum = 0;

    const digits = [...roman];
    let skip = false;
    for (let i = 0; i < digits.length; i++) {
        const current = digits[i];
        const next = digits[i + 1];

        if (values[current] < values[next]) {
            sum += values[next] - values[current];
            i++;
        } else {
            sum += values[current];
        }
    }

    return sum;
}

// console.log(solution('IV'));
// console.log(solution('MMVIII'));
// console.log(solution('XXI'));
// console.log(solution('XC'));

// Move zeros to end

// Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

// moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]

// function moveZeros(arr) {
//   const arrCopy = [];
//   let zeros = [];
//   for (let i = 0; i < arr.length; i++) {
//     const el = arr[i];
//     if (el === null) {
//       arrCopy.push(null);
//     } else if (typeof el === 'object' && !Array.isArray(el)) {
//       arrCopy.push({});
//     } else {
//       if (typeof el === 'string') {
//         arrCopy.push(el);
//       } else if (String(el) !== '0') {
//         arrCopy.push(el);
//       } else {
//         zeros.push(0);
//       }
//     }
//   }
//   return [...arrCopy, ...zeros];
// }

function moveZeros(arr) {
    const arrCopy = arr.filter(el => el !== 0);
    let zeros = arr.filter(el => el === 0);

    return [...arrCopy, ...zeros];
}

// console.log(
//   moveZeros([
//     false,
//     1,
//     {},
//     [],
//     [9, 1, 23, 0, 11, 12],
//     '0',
//     null,
//     2,
//     0,
//     1,
//     3,
//     'a',
//   ])
// );

function move_zeros(arrNum, isRight) {
    //Your Code logic should written here
    const arrCopy = arrNum.filter(el => el !== 0);
    const zeros = arrNum.filter(el => el === 0);
    return isRight ? [...arrCopy, ...zeros] : [...zeros, ...arrCopy];
}

// arrNum = [12, 0, 10, 0, 8, 12, 7, 6, 0, 4, 10, 12, 0];
// console.log(move_zeros(arrNum, true)); //=> returns [12, 10, 8, 12, 7, 6, 4, 10, 12, 0, 0, 0, 0]

// arrNum = [12, 0, 10, 0, 8, 12, 7, 6, 0, 4, 10, 12, 0];
// console.log(move_zeros(arrNum, false)); //=> returns [0, 0, 0, 0, 12, 10, 8, 12, 7, 6, 4, 10, 12]

// arrNum = [12, 0, 10, 0, 8, 12, 7, 6, 0, 4, 10, 12, 0];
// console.log(move_zeros(arrNum)); //=> returns [12, 10, 8, 12, 7, 6, 4, 10, 12, 0, 0, 0, 0]

// ############################
// Is Prime?

// Define a function that takes one integer argument and returns logical value true or false depending on if the integer is a prime.

// Per Wikipedia, a prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.

// Requirements
// You can assume you will be given an integer input.
// You can not assume that the integer will be only positive. You may be given negative numbers as well (or 0).
// NOTE on performance: There are no fancy optimizations required, but still the most trivial solutions might time out. Numbers go up to 2^31 (or similar, depends on language version). Looping all the way up to n, or n/2, will be too slow.
// Example

// var iterations = Math.floor(items.length / 8),
//   startAt = items.length % 8,
//   i = 0;

// do {
//   switch (startAt) {
//     case 0:
//       process(items[i++]);
//     case 7:
//       process(items[i++]);
//     case 6:
//       process(items[i++]);
//     case 5:
//       process(items[i++]);
//     case 4:
//       process(items[i++]);
//     case 3:
//       process(items[i++]);
//     case 2:
//       process(items[i++]);
//     case 1:
//       process(items[i++]);
//   }
//   startAt = 0;
// } while (iterations--);

function isPrime(n) {
    let iterations = Math.floor(n / 8);
    const startAt = n % 8;
    let i = 0;

    do {
        switch (startAt) {
            case 0:
            case 7:
            case 6:
            case 5:
            case 4:
            case 3:
            case 2:
            case 1:
        }
    } while (iterations--);
}

function isPrime(num) {
    if (num <= 2) {
        return num === 2 ? true : false;
    }
    if (num > 2 && num % 2 === 0) {
        return false;
    }
    // debugger;
    const sqrt = Math.floor(Math.sqrt(num));

    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// function isPrime(num, i = 2) {
//   if (num <= 2) {
//     return num == 2 ? true : false;
//   }
//   if (num % i == 0) {
//     return false;
//   }
//   if (i * i > num) {
//     return true;
//   }
//   return isPrime(num, i + 1);
// }

// console.log(isPrime(1)); /* false */
// console.log(isPrime(2)); /* true  */

// console.log(isPrime(-1)); /* false */

// console.log(isPrime(17));
// console.log(isPrime(18));
// console.log(isPrime(19));
// console.log(isPrime(20));
// console.log(isPrime(21));
// console.log(isPrime(22));
// console.log(isPrime(23));
// console.log(isPrime(61));
// console.log(isPrime(71));
// console.log(isPrime(63));
// console.log(isPrime(83));
// console.log(isPrime(12314567201));

// Facebook like

// You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

// Implement the function which takes an array containing the names of people that like an item. It must return the display text as shown in the examples:

// []                                -->  "no one likes this"
// ["Peter"]                         -->  "Peter likes this"
// ["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
// ["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
// ["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"
// Note: For 4 or more names, the number in "and 2 others" simply increases.

function likes(arr) {
    arr = arr.filter(el => {
        if (el) {
            return el;
        }
    });
    const [first, second, third, ...rest] = arr.filter(el => el);
    const plural = arr.length > 1 ? 'like' : 'likes';
    const str = {
        0: `no one ${plural} this`,
        1: `${first} ${plural} this`,
        2: `${first} and ${second} ${plural} this`,
        3: `${first}, ${second} and ${third} ${plural} this`,
        default: `${first}, ${second} and ${arr.rest + 1} others ${plural} this`,
    };

    return arr.length > 3 ? str.default : str[arr.length];
}

// console.log(likes(['Alex', 'Jacob', 'Mark', 'Max']));
// console.log(likes(['Alex', 'Jacob', , 'Max']));
// console.log(likes(['Alex', 'Jacob', 'Mark']));
// console.log(likes(['Alex', 'Jacob']));
// console.log(likes(['Alex']));

// Find a meeting room

// Your job at E-Corp is both boring and difficult. It isn't made any easier by the fact that everyone constantly wants to have a meeting with you, and that the meeting rooms are always taken!

// In this kata, you will be given an array. Each value represents a meeting room. Your job? Find the first empty one and return its index (N.B. There may be more than one empty room in some test cases).

// 'X' --> busy
// 'O' --> empty
// If all rooms are busy, return "None available!"

function meeting(x) {
    return x.indexOf('O') !== -1 ? x.indexOf('O') : 'None available!';
}

// console.log(meeting(['X', 'O', 'X'])); //, 1);
// console.log(meeting(['O', 'X', 'X', 'O', 'X'])); //, 0);
// console.log(meeting(['X', 'X', 'X', 'X', 'X'])); //, 'None available!');

// Coding Challenge #2
// Let's continue with our football betting app! Keep using the 'game' variable from
// before.
// Your tasks:
// 1. Loop over the game.scored array and print each player name to the console,
// along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already
// studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
//  Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them
// (except for "draw"). Hint: Note how the odds and the game objects have the
// same property names 😉
// 4. Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value. In this
// game, it will look like this:
// {
//   Gnarby: 1,
//   Hummels: 1,
//   Lewandowski: 2
// }

// GOOD LUCK 😀

const scorers = game.scored?.map((el, idx) => {
    return `Goal  ${idx + 1}: ${el}`;
});

// console.log(scorers);

const avgOdd = function () {
    const values = Object.values(game.odds);
    let sum = 0;
    for (const odd of values) {
        sum += odd;
    }
    return Math.round((sum / values.length) * 100) / 100;
};
// console.log(avgOdd());

for (const [team, odd] of Object.entries(game.odds)) {
    const teamStr = team === 'x' ? 'draw' : `victory of ${game[team]}`;

    // console.log(`Odd of ${teamStr} is ${odd}`);
}

// const deDupeScorers = game.scored.filter((el, idx, arr) => {
//   // debugger;
//   return arr.slice(idx + 1, arr.length).indexOf(el) === -1 ? el : '';
// });

// BONUS 1) Method
const deDupeScorers = [...new Set(game.scored)];
// console.log(deDupeScorers);

const scorersNew = deDupeScorers.map(player => {
    // debugger;
    const tally = game.scored.reduce((sum, el) => {
        if (el === player) {
            sum++;
        }
        return sum;
    }, 0);
    return [player, tally];
});
// console.log(Object.fromEntries(scorersNew));

// BONUS 2) Method
const scorers2 = {};
for (const player of game.scored) {
    scorers2[player] ? scorers2[player]++ : (scorers2[player] = 1);
}
// console.log(scorers2);

// Coding Challenge 3
// Let's continue with our football betting app! This time, we have a map called
// 'gameEvents' (see below) with a log of the events that happened during the
// game. The values are the events themselves, and the keys are the minutes in which
// each event happened (a football game has 90 minutes plus some extra time).
// Your tasks:
// 1. Create an array 'events' of the different game events that happened (no
// duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64
// was unfair. So remove this event from the game events log.
// 3. Compute and log the following string to the console: "An event happened, on
// average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over 'gameEvents' and log each element to the console, marking
// whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽ GOAL

// GOOD LUCK 😀

const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '🔶 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
// console.log(events);
gameEvents.delete(64);
// console.log(gameEvents);
const eventKeys = [...gameEvents.keys()];

// console.log(eventKeys);
// console.log(
//   `An event happened on average, every ${Math.floor(
//     90 / gameEvents.size
//   )} minutes.`
// );

// for (const [min, value] of eventKeys) {
//   const str = ` ${min}: ${value}`;
//   console.log((min < 45 ? '[FIRST HALF]' : '[SECOND HALF]') + str);
// }

// Coding Challenge #4
// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.
// Test data (pasted to textarea, including spaces):
/*
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure
*/
// Should produce this output (5 separate console.log outputs):
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calcAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅
// Hints:
// § Remember which character defines a new line in the textarea 😉
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable
// name conversion working 😉
// § This challenge is difficult on purpose, so start watching the solution in case
// you're stuck. Then pause and continue!

// Afterwards, test with your own test data!

// GOOD LUCK 😀

const textEl = document.createElement('textarea');
document.body.append(textEl);
const btn = document.createElement('button');
btn.type = 'Submit';
btn.innerText = 'Submit';
document.body.append(btn);

const para = document.createElement('p');
document.body.appendChild(para);

const getCamelCase = function () {
    // debugger;
    const str = textEl.value;
    const varArr = str.split('\n');
    const camelCaseArr = varArr.map((el, index) => {
        const [first, ...words] = el.trim().toLowerCase().split('_');
        const wordsUpper = [];
        for (let word of words) {
            word = word[0].toUpperCase() + word.slice(1);
            wordsUpper.push(word);
        }

        const ticks = '✅'.repeat(index + 1);
        el = first + wordsUpper.join('');
        el = el.padEnd(25, ' ') + ticks;
        console.log(el);
        return el;
    });

    para.textContent = camelCaseArr;
};
// btn.addEventListener('click', getCamelCase);

// Strings extra practice

const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const flightInfo = function (data) {
    // debugger;
    let maxInfo = 0;
    const getCode = string => string.slice(0, 3).toUpperCase();
    for (const flight of data.split('+')) {
        const [type, from, to, time] = flight.split(';');
        const str = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
            '_',
            ' '
        )} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`;
        maxInfo = Math.max(str.length, maxInfo);
        console.log(str.padStart(maxInfo, ' '));
    }
};
flightInfo(flights);
'use strict';

// Directions Reduction
// Once upon a time, on a way through the old wild mountainous west,…
// … a man was given directions to go from one point to another. The directions were "NORTH", "SOUTH", "WEST", "EAST". Clearly "NORTH" and "SOUTH" are opposite, "WEST" and "EAST" too.

// Going to one direction and coming back the opposite direction right away is a needless effort. Since this is the wild west, with dreadfull weather and not much water, it's important to save yourself some energy, otherwise you might die of thirst!

// How I crossed a mountainous desert the smart way.
// The directions given to the man are, for example, the following (depending on the language):

// ["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"].
// or
// { "NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST" };
// or
// [North, South, South, East, West, North, West]
// You can immediatly see that going "NORTH" and immediately "SOUTH" is not reasonable, better stay to the same place! So the task is to give to the man a simplified version of the plan. A better plan in this case is simply:

// ["WEST"]
// or
// { "WEST" }
// or
// [West]
// Other examples:
// In ["NORTH", "SOUTH", "EAST", "WEST"], the direction "NORTH" + "SOUTH" is going north and coming back right away.

// The path becomes ["EAST", "WEST"], now "EAST" and "WEST" annihilate each other, therefore, the final result is [] (nil in Clojure).

// In ["NORTH", "EAST", "WEST", "SOUTH", "WEST", "WEST"], "NORTH" and "SOUTH" are not directly opposite but they become directly opposite after the reduction of "EAST" and "WEST" so the whole path is reducible to ["WEST", "WEST"].

// Task
// Write a function dirReduc which will take an array of strings and returns an array of strings with the needless directions removed (W<->E or S<->N side by side).

// The Haskell version takes a list of directions with data Direction = North | East | West | South.
// The Clojure version returns nil when the path is reduced to nothing.
// The Rust version takes a slice of enum Direction {North, East, West, South}.
// See more examples in "Sample Tests:"
// Notes
// Not all paths can be made simpler. The path ["NORTH", "WEST", "SOUTH", "EAST"] is not reducible. "NORTH" and "WEST", "WEST" and "SOUTH", "SOUTH" and "EAST" are not directly opposite of each other and can't become such. Hence the result path is itself : ["NORTH", "WEST", "SOUTH", "EAST"].

function dirReduc(arr) {
    //   debugger;
    const xDirs = ['NS', 'SN', 'EW', 'WE'];
    let validDirs = [];
    let found = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1]) {
            const str = `${arr[i][0]}${arr[i + 1][0]}`;
            const present = xDirs.includes(str);
            if (!present) {
                validDirs.push(arr[i]);
            } else {
                found = true;
                i++;
            }
        } else if (i == arr.length - 1) {
            validDirs.push(arr[i]);
        }
    }
    if (found) {
        validDirs = dirReduc(validDirs);
    }
    return validDirs;
}

// console.log(
//   dirReduc(['NORTH', 'SOUTH', 'SOUTH', 'EAST', 'WEST', 'NORTH', 'WEST'])
// );

// console.log(dirReduc(['NORTH', 'WEST', 'SOUTH', 'EAST']));

// Code War
// Interesting numbers

// 777...8?!??!", exclaimed Bob, "I missed it again! Argh!" Every time there's an interesting number coming up, he notices and then promptly forgets. Who doesn't like catching those one-off interesting mileage numbers?

// Let's make it so Bob never misses another interesting number. We've hacked into his car's computer, and we have a box hooked up that reads mileage numbers. We've got a box glued to his dash that lights up yellow or green depending on whether it receives a 1 or a 2 (respectively).

// It's up to you, intrepid warrior, to glue the parts together. Write the function that parses the mileage number input, and returns a 2 if the number is "interesting" (see below), a 1 if an interesting number occurs within the next two miles, or a 0 if the number is not interesting.

// Note: In Haskell, we use No, Almost and Yes instead of 0, 1 and 2.

// "Interesting" Numbers
// Interesting numbers are 3-or-more digit numbers that meet one or more of the following criteria:

// Any digit followed by all zeros: 100, 90000 // DONE
// Every digit is the same number: 1111 // DONE
// The digits are sequential, incementing†: 1234 DONE
// The digits are sequential, decrementing‡: 4321 DONE
// The digits are a palindrome: 1221 or 73837 //DONE
// The digits match one of the values in the awesomePhrases array
// † For incrementing sequences, 0 should come after 9, and not before 1, as in 7890.
// ‡ For decrementing sequences, 0 should come after 1, and not before 9, as in 3210.

// So, you should expect these inputs and outputs:

// Error Checking
// A number is only interesting if it is greater than 99!
// Input will always be an integer greater than 0, and less than 1,000,000,000.
// The awesomePhrases array will always be provided, and will always be an array, but may be empty. (Not everyone thinks numbers spell funny words...)
// You should only ever output 0, 1, or 2.

const isInRange = function (number) {
    return number > 99 && number < 1000000000;
};

const isPalindrome = function (number) {
    const numberReversed = number.toString().split('').reverse().join('');
    return number === parseInt(numberReversed);
};

const isSameNumber = function (number) {
    const digits = `${number}`.split('');
    return digits.every(el => el === digits[0]);
};

const isZeros = function (number) {
    const [first, ...rest] = `${number}`;
    return rest.every(el => parseInt(el) === 0);
};

const isSequential = function (number) {
    const ascending = '1234567890';
    const descending = '9876543210';
    let order = 'ASC';
    if (this.order) order = this.order;

    if (order === 'ASC') {
        return ascending.includes(`${number}`);
    } else {
        return descending.includes(`${number}`);
    }
};

const isAwesomePhrase = function (number) {
    return this.phraseArray.includes(number);
};

function mapper(arr, fn, map, options = {}) {
    const res = arr.map(fn.bind(options));
    let maxScore = 0;
    const resScores = res.map((el, i) => {
        if (el && i === 0) {
            return Math.max(maxScore, 2);
        } else if (el && i > 0) {
            return Math.max(maxScore, 1);
        } else {
            return Math.max(maxScore, 0);
        }
    });

    if (!map.has(fn.name) && !options.name) {
        map.set(fn.name, resScores);
    } else {
        map.set(`${fn.name}${options.name}`, resScores);
    }
    return map;
}

const validate = function (answerMap) {
    const answerArray = [...answerMap.values()];

    let maxScore = 0;
    for (let index = 0; index < answerArray[0].length; index++) {
        let vertArr = answerArray.map((el, i) => el[index]);
        if (vertArr[0]) {
            vertArr = vertArr.slice(1);
            maxScore = vertArr.reduce((prev, el) => Math.max(prev, el), maxScore);
        }
    }

    return maxScore;
};

function isInteresting(number, awesomePhrases) {
    const arr = [number, number + 1, number + 2];
    const answers = new Map();
    mapper(arr, isInRange, answers);
    mapper(arr, isPalindrome, answers);
    mapper(arr, isSameNumber, answers);
    mapper(arr, isZeros, answers);
    mapper(arr, isSequential, answers, {name: 'Ascending'});
    mapper(arr, isSequential, answers, {
        name: 'Descending',
        order: 'DESC',
    });
    mapper(arr, isAwesomePhrase, answers, {phraseArray: awesomePhrases});

    const res = validate(answers);
    // console.log(res);
    return res;
}

// const checkValidRange = function (arr) {
//   return arr.map((el, i) => (el > 0 ? i : null));
// };
// const validRange = checkValidRange(answers.get('isInRange'));
// isSequential(1234567890);

// console.log(isPalindrome(11211));

// // "boring" numbers
// isInteresting(3, [1337, 256]); // 0

// isInteresting(3236, [1337, 256]); // 0

// // // progress as we near an "interesting" number
// isInteresting(11207, []); // 0
// isInteresting(11208, []); // 0
// isInteresting(11209, []); // 1
// isInteresting(11210, []); // 1
// isInteresting(11211, []); // 2

// // // nearing a provided "awesome phrase"
// isInteresting(1335, [1337, 256]); // 1
// isInteresting(1336, [1337, 256]); // 1
// isInteresting(1337, [1337, 256]); // 2

// RGB To Hex Conversion

// The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.

// Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.

// The following are examples of expected output values:

// rgb(255, 255, 255) // returns FFFFFF
// rgb(255, 255, 300) // returns FFFFFF
// rgb(0,0,0) // returns 000000
// rgb(148, 0, 211) // returns 9400D3

function rgb(r, g, b) {
    return [r, g, b].reduce((prev, el) => {
        el = Math.min(255, el);
        el = Math.max(el, 0);
        prev +=
            el.toString(16).length == 1
                ? el.toString(16).padStart(2, '0').toUpperCase()
                : el.toString(16).toUpperCase();
        return prev;
    }, '');
}

// // rgb(255, 255, 300);
// console.log(rgb(99, 4, 27));

// // rgb(148, 0, 211);

// Human-readable working hours
// Your task in order to complete this Kata is to write a function which formats a working hours schedule, given as an array of objects, in a human-friendly way.

// The function must accept an unsorted array. If the array is empty, it just returns an empty array. Otherwise, it should make a sorted human-friendly schedule of working hours and return it as a string.

// The output format for one day should be SUN: 11:00 - 23:00.

// If two or more days of the week in a row have the same working hours they should be concatenated and have the following format: MON - WED: 11:00 - 23:00.

// It is much easier to understand with an example:

// ** Output **

// MON - WED: 11:00 - 23:00
// THU - FRI: 12:00 - 23:00
// SAT: 10:00 - 23:00
// SUN: 11:00 - 23:00
// Be careful because some days may be missed. You may be given an array only of Monday and Friday with the same hours, but they shouldn't be concatenated.

// ** Input **
const data = [
    {
        day: 'sat',
        from: '10:00',
        to: '23:00',
    },
    {
        day: 'mon',
        from: '11:00',
        to: '23:00',
    },
    {
        day: 'tue',
        from: '11:00',
        to: '23:00',
    },
    {
        day: 'wed',
        from: '11:00',
        to: '23:00',
    },
    {
        day: 'thu',
        from: '12:00',
        to: '23:00',
    },
    {
        day: 'fri',
        from: '12:00',
        to: '23:00',
    },
    {
        day: 'sun',
        from: '11:00',
        to: '23:00',
    },
];

const data2 = [
    {
        day: 'sat',
        from: '11:00',
        to: '23:00',
    },
    {
        day: 'mon',
        from: '11:00',
        to: '23:00',
    },

    {
        day: 'wed',
        from: '11:00',
        to: '23:00',
    },
    {
        day: 'thu',
        from: '12:00',
        to: '23:00',
    },
    {
        day: 'fri',
        from: '12:00',
        to: '23:00',
    },
    {
        day: 'sun',
        from: '11:00',
        to: '23:00',
    },
];

const readableTimetable = workdays => {
    const isNeighbour = function (a, b) {
        return dayOrder.indexOf(b) - dayOrder.indexOf(a) === 1;
    };
    const equalTime = function (obj1, obj2) {
        return obj1.from === obj2.from && obj1.to === obj2.to;
    }

    const stringBuilder = function (arr) {
        let str = arr.reduce((prev, el) => {
            const optStr = el.days.length > 1 ? ` - ${el.days[el.days.length - 1].toUpperCase()}` : '';
            prev += `${el.days[0].toUpperCase()}${optStr}: ${el.from} - ${el.to}\n`;
            return prev;
        }, '')
        return str.trim();
    }

    if (workdays.length === 0) {
        return [];
    }
    const dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    workdays.sort((a, b) => {
        return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    });

    let batch = 0;
    const dayArrays = [];
    for (let [index, workday] of workdays.entries()) {
        if (dayArrays.length === 0) {
            dayArrays.push({days: [workday.day], from: workday.from, to: workday.to});
        } else if (isNeighbour(workdays[index - 1].day, workday.day) && equalTime(workdays[index - 1], workday)) {
            dayArrays[batch].days.push(workday.day);
        } else {
            dayArrays.push({days: [workday.day], from: workday.from, to: workday.to});
            batch++;
        }

    }
    return stringBuilder(dayArrays);
};
// readableTimetable();
// console.dir(readableTimetable(data));


// Let's build a simple poll app!
// A poll has a question, an array of options from which people can choose, and an
// array with the number of replies for each option. This data is stored in the starter
// 'poll' object below.
// Your tasks:
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The
// method does 2 things:
// 1.1. Display a prompt window for the user to input the number of the
// selected option. The prompt should look like this:
// What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)
// 1.2. Based on the input number, update the 'answers' array property. For
// example, if the option is 3, increase the value at position 3 of the array by
// 1. Make sure to check if the input is a number and if the number makes
// sense (e.g. answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The
// method takes a string as an input (called 'type'), which can be either 'string'
// or 'array'. If type is 'array', simply display the results array as it is, using
// console.log(). This should be the default option. If type is 'string', display a
// string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each
// 'registerNewAnswer' method call.
// 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
// data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
// object! So what should the this keyword look like in this situation?

// The Complete JavaScript Course 21
// Test data for bonus:
// § Data 1: [5, 2, 3]
// § Data 2: [1, 5, 3, 9, 6, 1]
// Hints: Use many of the tools you learned about in this and the last section 😉
const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),
};

poll.prompt = function () {
    return prompt(
        `${this.question}\n${this.options.join('\n')} \n(Write option number)`
    );
};
poll.registerNewAnswer = function () {
    let answer = this.prompt();
    // console.log(answer);

    const optionNumbers = this.options.map(el => el.split(':')[0]);
    if (!answer) {

    } else if (optionNumbers.includes(answer)) {
        this.answers[answer]++;
        this.displayResults('string');
    } else {
        alert(`Number ${answer} is not a valid option. Try again later.`);
        this.registerNewAnswer();
    }
};

poll.displayResults = function (type = 'array') {
    if (type !== 'array') {
        console.log(`Poll results are ${this.answers.join(', ')}.`);
    } else {
        console.log(this.answers);
    }
};

document
    .querySelector('.poll')
    .addEventListener('click', poll.registerNewAnswer.bind(poll));

// const data1 = { answers: [5, 2, 3] };
// const data2 = { answers: [1, 5, 3, 9, 6, 1] };

const displayData = poll.displayResults;
// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// displayData.call(data1, 'string');// or a function
// displayData.call(data2, 'string');
// displayData.call(data1);
// displayData.call(data2);

// Coding Challenge #2
// This is more of a thinking challenge than a coding challenge 🤓
// Your tasks:
//     1. Take the IIFE below and at the end of the function, attach an event listener that
// changes the color of the selected h1 element ('header') to blue, each time
// the body element is clicked. Do not select the h1 element again!
//     2. And now explain to yourself (or someone around you) why this worked! Take all
// the time you need. Think about when exactly the callback function is executed,
//     and what that means for the variables involved in this example.
//
//
(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    window.addEventListener('click', () => header.style.color = 'lightblue');
})();
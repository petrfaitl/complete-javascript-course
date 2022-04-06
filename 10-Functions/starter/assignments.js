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
  mapper(arr, isSequential, answers, { name: 'Ascending' });
  mapper(arr, isSequential, answers, {
    name: 'Descending',
    order: 'DESC',
  });
  mapper(arr, isAwesomePhrase, answers, { phraseArray: awesomePhrases });

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
  const rgb = [r, g, b];
  const hex = rgb.reduce((prev, el) => (prev += el.toString(16)), '');
}

rgb(255, 255, 256);
rgb(148, 0, 211);

'use strict';

// let garden = 'gravel gravel gravel gravel gravel gravel gravel gravel gravel rock slug ant gravel gravel snail rock gravel gravel gravel gravel gravel gravel gravel slug gravel ant gravel gravel gravel gravel rock slug gravel gravel gravel gravel gravel snail gravel gravel rock gravel snail slug gravel gravel spider gravel gravel gravel gravel gravel gravel gravel gravel moss gravel gravel gravel snail gravel gravel gravel ant gravel gravel moss gravel gravel gravel gravel snail gravel gravel gravel gravel slug gravel rock gravel gravel rock gravel gravel gravel gravel snail gravel gravel rock gravel gravel gravel gravel gravel spider gravel rock gravel gravel';
let garden = 'slug spider rock gravel gravel gravel gravel gravel gravel gravel';
let newGarden = garden.split(' ')
                      .map(el => {
                          return (el === 'rock') ? 'rock' : 'gravel';
                      })
                      .join(' ');
// console.log(newGarden);

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
// about their dog's age, and stored the data into an array (one array for each). For
// now, they are just interested in knowing whether a dog is an adult or a puppy.
//     A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
// old.
//     Your tasks:
//     Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// ('dogsJulia' and 'dogsKate'), and does the following things:
//     1. Julia found out that the owners of the first and the last two dogs actually have
// cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function
// parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
// 🐶
// ")
// 4. Run the function for both test datasets
// Test data:
//     § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const checkDogs = function (arr, arr2) {
    const arrCombined = arr.filter((el, i, arr) => (i !== 0 && i !== arr.length - 1 && i !== arr.length - 2) ? el : '')
                           .concat(arr2);
    arrCombined.forEach((el, i, arr) => {
        console.log(`Dog number ${i + 1} is ${el >= 3 ? `an adult, and is ${el} years old` : 'still a puppy 🐶'}`);

    });

}
const juliasData = [9, 16, 6, 8, 3];//[3, 5, 2, 12, 7];
const kateData = [10, 5, 6, 1, 4]//;[4, 1, 15, 8, 3];
// checkDogs(juliasData, kateData);

// Coding Challenge #2
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.
//     Your tasks:
//     Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
//     humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets
// Test data:
//     § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (ages) {
    return Math.floor(ages.map(age => {
        return age <= 2 ? age * 2 : 16 + age * 4
    })
                          .filter(el => el >= 18)
                          .reduce((acc, el, _, arr) => acc + el / arr.length, 0));

}

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
// const deposits = (mov) => mov > 0;
//
// const bankDepositSum = accounts.flatMap(acc => acc._movements).filter(deposits).reduce((sum, dep) => sum + dep, 0);
// const bankBalance = accounts.flatMap(acc => acc._movements).reduce((sum, dep) => sum + dep, 0);
// const numDeposists1000 = accounts.flatMap(acc => acc._movements)
//                                  .reduce((tot, el) => el >= 1000 ? ++tot : tot, 0);
//
// console.log(bankDepositSum, bankBalance, numDeposists1000);

// Create an object with sums of deposits and withdrawals, using reduce method

const { deposits, withdrawals } = accounts.flatMap(acc => acc.movements)
                                          .reduce((tot, mov) => {
                                              mov > 0 ? tot.deposits += mov : tot.withdrawals += mov;
                                              return tot;
                                          }, { deposits: 0, withdrawals: 0 })

// console.log(deposits, withdrawals);

const convertTitleCase = function (title) {
    const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'is', 'to'];
    const capitalise = (str) => str[0].toUpperCase().concat(str.slice(1));
    const titleCase = title.toLowerCase().split(' ').map(word => {
        return exceptions.includes(word) ? word : capitalise(word);
    }).join(' ');
    return capitalise(titleCase);
}

// console.log(convertTitleCase('and is an EXAMPLE sentence that needs an attention'));
// console.log(convertTitleCase('yet another title case thing'));
// console.log(convertTitleCase('if needed, you can add the text together with a tag: just add a tag name and'));
// console.log(convertTitleCase('If you want to generate a specific number of words, add a number after'));

// Coding Challenge #4
// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
//     Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
//     Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).
// Your tasks:
//     1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects 😉)
// The Complete JavaScript Course 26
// Hints:
//     § Use many different tools to solve these challenges, you can use the summary
// lecture to choose between them 😉
// § Being within a range 10% above and below the recommended portion means:
//     current > (recommended * 0.90) && current < (recommended *
//         1.10). Basically, the current portion should be between 90% and 110% of the
// recommended portion.

// Test data:
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

const recommendedPortion = function (obj) {

}
dogs.forEach(el => el.recFood = Math.floor(el.weight ** 0.75 * 28));

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(`Sarah's dog eats too ${sarahDog.curFood > sarahDog.recFood ? 'much' : 'little'} `);

const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood
).flatMap(el => el.owners);

const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood)
                               .flatMap(el => el.owners);
const eatingExactly = dogs.some(dog => dog.curFood === dog.recFood);

const checkEatingOkay = function (dog) {
    return dog.curFood > dog.recFood * .9 && dog.curFood < dog.recFood * 1.1;
}
const eatingOkay = dogs.some(checkEatingOkay);
const dogsEatingOkay = dogs.filter(checkEatingOkay);
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
// console.log(eatingExactly);
// console.log(eatingOkay);
// console.log(dogsEatingOkay);
// console.log(dogsSorted);
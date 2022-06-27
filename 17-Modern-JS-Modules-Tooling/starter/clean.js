'use strict';

const budget = Object.freeze([{
  value: 250, description: 'Sold old TV 📺', user: 'jonas'
}, {
  value: -45, description: 'Groceries 🥑', user: 'jonas'
}, { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' }, {
  value: 300, description: 'Freelancing 👩‍💻', user: 'jonas'
}, { value: -1100, description: 'New iPhone 📱', user: 'jonas' }, {
  value: -20, description: 'Candy 🍭', user: 'matilda'
}, { value: -125, description: 'Toys 🚂', user: 'matilda' }, {
  value: -1800, description: 'New Laptop 💻', user: 'jonas'
}]);

const spendingLimits = Object.freeze({
                                       jonas: 1500, matilda: 100
                                     });

const getLimit = (limits, user) => limits?.[user] ?? 0;

const addExpense = function(state, limit, value, description, user = 'jonas') {

  const cleanUser = user.toLowerCase();
  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  return value <= getLimit(limit, user) ? [...state, {
    value: -value, description, user: cleanUser
  }] : state;

};
const newBudget = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget,
                              spendingLimits,
                              100,
                              'Going to' + ' movies 🍿',
                              'Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

const checkExpenses = function(state, limits) {
  return state.map(entry => entry.value < -getLimit(limits, entry.user)
                            ? { ...entry, flag: 'limit' }
                            : entry);
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);


const listBigExpenses = function(state, bigLimit) {

  return state.filter(el => el.value <= -bigLimit)
              .map(el => el.description.slice(-2))
              .join(' / ');

};
console.log(listBigExpenses(newBudget, 500));
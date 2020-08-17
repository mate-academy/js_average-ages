'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting && Math.ceil(person.died / 100) === century

  const mens = (century)
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)

    : people.filter(person => person.sex === 'm');

  const mensTotalAge = mens.map(man => man.died - man.born)
    .reduce(function(sumOfAges, currentManAge) {
      return sumOfAges + currentManAge;
    },);

  const mensAverage = mensTotalAge / mens.length;

  return mensAverage;
};

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womans = (withChildren)
    ? people.filter(person => person.sex === 'f'
      && people.some(child => person.name === child.mother))

    : people.filter(person => person.sex === 'f');

  const womanTotalAge = womans.map(woman => woman.died - woman.born)
    .reduce(function(sumOfAges, currentWomanAge) {
      return sumOfAges + currentWomanAge;
    },);

  const womanAverage = womanTotalAge / womans.length;

  return womanAverage;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const allKids = (onlyWithSon)
    ? people.filter(person => people
      .some(woman => person.mother === woman.name)
        && person.sex === 'm')
    : people.filter(person => people
      .some(woman => person.mother === woman.name));

  let totalDifference = 0;
  let mother;

  for (const person of allKids) {
    mother = people.find(personMother => person.mother === personMother.name);

    totalDifference += person.born - mother.born;
  }

  return totalDifference / allKids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

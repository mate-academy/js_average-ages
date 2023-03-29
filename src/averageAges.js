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
  // without nesting
  let mens = people.filter(person => person.sex === 'm');

  /* eslint-disable max-len */
  mens = century ? mens.filter(men => Math.ceil(men.died / 100) === century) : mens;

  const yearsAlive = mens.map(men => men.died - men.born);

  return yearsAlive.reduce((sum, year) => sum + year, 0) / yearsAlive.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const allMothers = people.map(person => person.mother);
  const mothers = people.filter(person => allMothers.includes(person.name));
  /* eslint-disable max-len */
  const yearsAlive = withChildren ? mothers.map(mother => mother.died - mother.born) : women.map(woman => woman.died - woman.born);

  return yearsAlive.reduce((sum, year) => sum + year, 0) / yearsAlive.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  /* eslint-disable max-len */
  const children = onlyWithSon ? people.filter(child => child.sex === 'm' && people.some(mother => mother.name === child.mother)) : people.filter(child => people.some(mother => mother.name === child.mother));

  const difference = children.map(child => child.born - people.find(mother => mother.name === child.mother).born);

  return difference.reduce((sum, diff) => sum + diff) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

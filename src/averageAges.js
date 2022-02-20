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
// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting
function calculateMenAverageAge(people, century) {
  const mens = people.filter(elem => elem.sex === 'm'
  && century ? Math.ceil(elem.died / 100) === century : elem.sex === 'm');

  const mensAge = mens.map(elem => elem.died - elem.born);

  const averageAgeOfMens = mensAge.reduce((a, b) => a + b);

  return averageAgeOfMens / mens.length;
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
  const womens = people.filter(withChildren ? mother =>
    people.find(children => children.mother === mother.name) : elem =>
    elem.sex === 'f');

  const womensAge = womens.map(elem => elem.died - elem.born);

  const averageAgeOfWomens = womensAge.reduce((a, b) => a + b);

  return averageAgeOfWomens / womens.length;
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
  const womenWithSon = people.filter(child => onlyWithSon
    ? people.find(person => person.name === child.mother
  && child.sex === 'm')
    : people.find(person => person.name === child.mother));

  const ageDiff = womenWithSon.map(child => child.born - people.find(person =>
    person.name === child.mother).born);

  const averageAgeDiff = ageDiff.reduce((a, b) => a + b) / ageDiff.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  let men = people.filter((person) => person.sex === 'm');

  century ? men = men
    .filter((person) => Math.ceil(person.died / 100) === century)
    .map((person) => person.died - person.born)
    : men = men.map((person) => person.died - person.born);

  return men.reduce((a, b) => a + b) / men.length;
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
  let mothers;

  withChildren ? mothers = people
    .filter(person => people
      .some(child => child.mother === person.name))
    : mothers = people.filter(person => person.sex === 'f');

  return mothers.map(mom => mom.died - mom.born)
    .reduce((a, b) => (a + b)) / mothers.length;
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
  const arrayWomens = people.filter(person => person.sex === 'f');
  const arrayMoms = arrayWomens.filter(women =>
    people.find(person => person.mother === women.name));

  const arrayChilds = people.filter(child =>
    arrayMoms.find(mother => mother.name === child.mother) && (child.sex === 'm'
    || onlyWithSon === undefined));

  const agesDifference = arrayChilds.map(child =>
    child.born - arrayMoms.find(mother => child.mother === mother.name).born);

  const sumOfAge = agesDifference.reduce((sum, age) => sum + age, 0);

  return Math.round(sumOfAge / agesDifference.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

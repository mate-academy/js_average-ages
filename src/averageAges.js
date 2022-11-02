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
  const diedInThisCentury = (century)
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;

  const onlyMens = diedInThisCentury.filter(person => person.sex === 'm');

  return onlyMens
    .reduce((sum, person) => person.died - person.born + sum, 0)
    / onlyMens.length;
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
  const personWithChildren = (withChildren)
    ? people.filter(person => people
      .some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return personWithChildren
    .reduce((sum, person) => person.died - person.born + sum, 0)
    / personWithChildren.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
/ *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const men = people.filter(person => person.sex === 'm');
  const children = (!onlyWithSon)
    ? people.filter(child => people
      .find(mother => mother.name === child.mother))
    : men.filter(son => people.find(mother => mother.name === son.mother));

  const diff = children
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born);

  return diff.reduce((sum, el) => sum + el, 0) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

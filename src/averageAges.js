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
  const male = people.filter(person => person.sex === 'm');

  const maleYearOfDeath = male.filter(filterByYearOfDeath);

  function filterByYearOfDeath(person) {
    return (person.died > (century - 1) * 100
    && person.died <= century * 100) ? person.died : 0;
  }

  return century
    ? (+(maleYearOfDeath.reduce((sum, man) => sum + man.died - man.born, 0)
    / maleYearOfDeath.length).toFixed(2))
    : (+(male.reduce((sum, man) => sum + man.died - man.born, 0)
    / male.length).toFixed(2));

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

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
  const female = people.filter(person => person.sex === 'f');

  const moms = people.filter(woman => people.some(person =>
    person.mother === woman.name));

  return withChildren
    ? (+(moms.reduce((sum, woman) => sum + woman.died - woman.born, 0)
    / moms.length).toFixed(2))
    : (+(female.reduce((sum, woman) => sum + woman.died - woman.born, 0)
    / female.length).toFixed(2));
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
  const children = people.filter(child => people.some(person =>
    child.mother === person.name));

  const ageDiff = children.map(ageDifference);

  const sons = people.filter(child => people.some(person =>
    child.mother === person.name && child.sex === 'm'));

  const ageDiffSon = sons.map(ageDifference);

  function ageDifference(child) {
    return child.born - people.find(mother =>
      mother.name === child.mother).born;
  }

  return onlyWithSon
    ? (+(ageDiffSon.reduce((sum, son) => sum + son, 0)
    / ageDiffSon.length).toFixed(2))
    : (+(ageDiff.reduce((sum, son) => sum + son, 0)
    / ageDiff.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

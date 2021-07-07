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

  function countCentury(year) {
    return (Math.ceil(year / 100));
  }

  function filterByYearOfDeath(person) {
    return countCentury(person.died) === century ? century : 0;
  }

  const maleYearOfDeath = male.filter(filterByYearOfDeath);

  function average(person) {
    return (+(person.reduce((sum, man) => sum + man.died - man.born, 0)
    / person.length).toFixed(2));
  }

  return century ? average(maleYearOfDeath) : average(male);

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
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const female = people.filter(person => person.sex === 'f');

  const moms = people.filter(woman => (
    people.some(person => (
      person.mother === woman.name
    ))
  ));

  function average(person) {
    return (+(person.reduce((sum, woman) => sum + woman.died - woman.born, 0)
    / person.length).toFixed(2));
  }

  return withChildren ? average(moms) : average(female);
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
  const children = people.filter(child => (
    people.some(person => (
      child.mother === person.name
    ))
  ));

  const ageDiff = children.map(ageDifference);

  const sons = people.filter(child => (
    people.some(person => (
      child.mother === person.name && child.sex === 'm'
    ))
  ));

  const ageDiffSon = sons.map(ageDifference);

  function ageDifference(child) {
    return child.born - people.find(mother =>
      mother.name === child.mother).born;
  }

  function average(person) {
    return (+(person.reduce((sum, son) => sum + son, 0)
    / person.length).toFixed(2));
  }

  return onlyWithSon ? average(ageDiffSon) : average(ageDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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

  people.filter(person => person.sex === 'm');

  const filteredMen = (century !== undefined)
    ? people.filter(person => person.sex === 'm'
    && Math.floor((person.died - 1) / 100) + 1 === century)
    : people.filter(person => person.sex === 'm');

  const averageManAge = filteredMen.reduce(function(ageSumm, man) {
    const age = man.died - man.born;
    const totalAge = ageSumm + age;

    return totalAge;
  }, 0) / filteredMen.length;

  return averageManAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  // write code here
  const filteredWomen = (withChildren !== undefined)
    ? people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const averageWomanAge = filteredWomen.reduce(function(ageSumm, woman) {
    const age = woman.died - woman.born;
    const totalAge = ageSumm + age;

    return totalAge;
  }, 0) / filteredWomen.length;

  return averageWomanAge;
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
  const filteredChildren = (!onlyWithSon)
    ? people.filter(person => (
      people.some(mother => person.mother === mother.name)))
    : people.filter(person => (
      person.sex === 'm'
      && people.some(mother => (person.mother === mother.name))));

  const averageDifferenceAge
  = filteredChildren.reduce(function(prev, child) {
    const totalAge = prev + (child.born
      - people.find(person => child.mother === person.name).born);

    return totalAge;
  }, 0) / filteredChildren.length;

  return averageDifferenceAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

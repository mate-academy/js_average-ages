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

function calculateSumOfAges(people) {
  return people.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0);
}

function calculateMenAverageAge(people, century) {
  const filteredMen = century
    ? people.filter(person =>
      (person.sex === 'm' && Math.ceil(person.died / 100) === century)
    )
    : people.filter(person => person.sex === 'm');

  return calculateSumOfAges(filteredMen) / filteredMen.length;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const filteredWoman
    = people.filter(person => {
      return withChildren
        ? person.sex === 'f' && people.some(
          child => child.mother === person.name
        )
        : person.sex === 'f';
    });

  return calculateSumOfAges(filteredWoman) / filteredWoman.length;
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
  const children = people.filter((person) => (
    people.some((woman) => woman.name === person.mother) && (
      onlyWithSon
        ? person.sex === 'm'
        : true
    )
  ));

  const differencesSum = children.reduce((acc, child) => {
    const mother = people.find(mom => mom.name === child.mother);

    return acc + (child.born - mother.born);
  }, 0);

  return differencesSum / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

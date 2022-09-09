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

  const men = people.filter(person => person.sex === 'm');

  const menFilter = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  return menFilter.reduce((sum, person, index, arr) => {
    return sum + (person.died - person.born) / arr.length;
  }, 0);
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
  // write code here
  const women = people.filter(person => person.sex === 'f');

  const womenFilter = withChildren
    ? women.filter(person => people.some(child => child.mother === person.name))
    : women;

  return womenFilter.reduce((sum, person, index, arr) => {
    return sum + (person.died - person.born) / arr.length;
  }, 0);
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
  // write code here
  const averagePeopleAge = onlyWithSon
    ? people.filter(child => child.sex === 'm')
    : people;

  return averagePeopleAge
    .filter(child => people.some(mother => mother.name === child.mother))
    .map(child => {
      return child.born - people.find(mother => {
        return mother.name === child.mother;
      }).born;
    })
    .reduce((sum, person, index, arr) => sum + person / arr.length, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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

const getAverageAge = people =>
  people.reduce((a, b) => a + (b.died - b.born), 0) / people.length;

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const menObjects = century
    ? people.filter((a) => a.sex === 'm' && Math.ceil(a.died / 100) === century)
    : people.filter(
      (a) => a.sex === 'm'
    );

  return getAverageAge(menObjects);
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
  const womenObjects = people.filter(woman => withChildren
    ? woman.sex === 'f'
    && people.some(child => child.mother === woman.name)
    : woman.sex === 'f'
  );

  return getAverageAge(womenObjects);
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
  const childObject = people.filter(child => onlyWithSon
    ? child.sex === 'm'
    && people.some(mother => mother.name === child.mother)
    : people.some(mother => mother.name === child.mother));

  const averageDiff = childObject.reduce((sum, child) => {
    const mother = people.find(mom => child.mother === mom.name);

    return sum + (child.born - mother.born);
  }, 0);

  return averageDiff / childObject.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

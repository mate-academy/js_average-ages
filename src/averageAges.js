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
  return people
    .filter(person => (person.sex === 'm')
      && (century === undefined || century === Math.ceil(person.died / 100))
    )
    .reduce((average, person, index, men) => {
      return average + (person.died - person.born) / men.length;
    }, 0);
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

function hasChildren(people, woman) {
  return people.some(person => person.mother === woman.name);
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
  return people
    .filter(person => person.sex === 'f')
    .filter(person => withChildren ? hasChildren(people, person) : true)
    .reduce((average, person, index, men) => {
      return average + (person.died - person.born) / men.length;
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
  return people
    .filter(child => onlyWithSon ? child.sex === 'm' : true)
    .filter(child => getMother(people, child))
    .reduce((average, child, index, children) => {
      const mother = getMother(people, child);

      return average + (child.born - mother.born) / children.length;
    }, 0);
}

function getMother(people, child) {
  return people.find(mother => mother.name === child.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

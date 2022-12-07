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

function calculateAverageAge(people) {
  return people.reduce((average, person, index, persons) =>
    average + (person.died - person.born) / persons.length, 0);
}

function calculateMenAverageAge(people, century) {
  return calculateAverageAge(people.filter(person => person.sex === 'm')
    .filter(person => century
      ? Math.ceil(person.died / 100) === century
      : true
    ));
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
  return calculateAverageAge(people.filter(person => person.sex === 'f')
    .filter(person => withChildren
      ? people.some(prsn => person.name === prsn.mother)
      : true
    ));
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

function getMother(people, child) {
  return people.find(mother => mother.name === child.mother);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  return people
    .filter(child => onlyWithSon ? child.sex === 'm' : true)
    .filter(child => getMother(people, child))
    .reduce((average, child, index, children) => {
      const mother = getMother(people, child);

      return average + (child.born - mother.born) / children.length;
    }, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

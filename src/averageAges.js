'use strict';

/**
 * @param {[]} people
 * @param {string} sex
 *
 * @return {[]}
 */
function filteredPersonsBySex(people, sex) {
  return people.filter(item => item.sex === sex);
}

/**
 * @param {[]} people
 *
 * @return {number}
 */
function countAverageAge(people) {
  return (
    people.reduce((total, person) =>
      total + (person.died - person.born), 0) / people.length
  );
}

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
  const allMen = !century
    ? filteredPersonsBySex(people, 'm')
    : people.filter(
      person => person.sex === 'm' && Math.ceil(person.died / 100) === century
    );

  return countAverageAge(allMen);
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
  const allWomen = !withChildren
    ? filteredPersonsBySex(people, 'f')
    : people.filter(women => {
      return people.find(child => child.mother === women.name);
    });

  return countAverageAge(allWomen);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const children = people.filter(function(child) {
    return people.find(function(mother) {
      return onlyWithSon
        ? child.mother === mother.name && child.sex === 'm'
        : child.mother === mother.name;
    });
  });

  return children.reduce((total, child) => {
    const mother = people.find(person => person.name === child.mother);
    return total + (child.born - mother.born) / children.length;
  }, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

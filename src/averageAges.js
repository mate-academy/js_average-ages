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
  let allMen = filteredPersonsBySex(people, 'm');
  if (century) {
    allMen = allMen.filter(person => Math.ceil(person.died / 100) === century);
  }

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
  let allWomen = filteredPersonsBySex(people, 'f');
  if (withChildren) {
    allWomen = allWomen.filter(women => {
      return people.find(child => child.mother === women.name);
    });
  }

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
  let children = people.filter(function(child) {
    return people.find(function(mother) {
      return child.mother === mother.name;
    });
  });
  let motherOfChildren = children.map(child => {
    return people.find(person => person.name === child.mother);
  });
  if (onlyWithSon) {
    children = filteredPersonsBySex(children, 'm');
    motherOfChildren = children.map(child => {
      return people.find(person => person.name === child.mother);
    });
  }
  return (
    (children.reduce(
      (total, child) =>
        total + (child.born), 0)
      - motherOfChildren.reduce((total, mother) =>
        total + (mother.born), 0))
    / children.length
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const filteredMan = people.filter(person => {
    if (century === undefined && person.sex === 'm') {
      return true;
    } else if (century === Math.ceil(person.died / 100) && person.sex === 'm') {
      return true;
    }
  });

  return filteredMan.reduce((acum, person) => {
    return acum + (person.died - person.born);
  }, 0) / filteredMan.length;
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
  const filteredFamily = people.filter(person => {
    if (withChildren === undefined && person.sex === 'f') {
      return true;
    } else if (person.sex === 'f' && people
      .some(child => person.name === child.mother)) {
      return true;
    }
  });

  return filteredFamily.reduce((acum, person) => {
    return acum + (person.died - person.born);
  }, 0) / filteredFamily.length;
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
  const filteredFamily = people.filter(person => {
    if (onlyWithSon === undefined && people
      .some(mom => mom.name === person.mother) !== false) {
      return true;
    } else if (person.sex === 'm' && people
      .some(mom => mom.name === person.mother) !== false) {
      return true;
    }
  });

  return filteredFamily.reduce((acum, child) => {
    return acum + child.born - people
      .find(mom => mom.name === child.mother).born;
  }, 0) / filteredFamily.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

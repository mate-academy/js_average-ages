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
  let filteredPeople;

  if (century) {
    filteredPeople = people.filter(human => {
      if (human.sex === 'm' && Math.ceil(human.died / 100) === century) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    filteredPeople = people.filter(human => human.sex === 'm');
  }

  const callback = (sum, cur) => sum + (cur.died - cur.born);

  return filteredPeople.reduce(callback, 0) / filteredPeople.length;
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
  let filteredPeople;

  if (withChildren) {
    filteredPeople = people.filter(human => {
      /* eslint max-len: ["error", { "code": 83}] */
      if (human.sex === 'f' && people.some(child => child.mother === human.name)) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    filteredPeople = people.filter(human => human.sex === 'f');
  }

  const callback = (sum, cur) => sum + (cur.died - cur.born);

  return filteredPeople.reduce(callback, 0) / filteredPeople.length;
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
  // write code here
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

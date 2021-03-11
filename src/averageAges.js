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
  let result = people.filter(i => i.sex === 'm');

  if (century !== undefined) {
    result = people.filter(i => i.sex === 'm'
    && Math.ceil(i.died / 100) === century);
  }

  result = (result.map(i => i.died - i.born).reduce((a, b) =>
    a + b) / result.length).toFixed(2);

  return +result;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
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
  let result = [...people].filter(i => i.sex === 'f');

  if (withChildren) {
    result = result.filter(i =>
      people.some(j => i.name === j.mother));
  }

  result = (result.filter(i => i.sex === 'f').map(i =>
    i.died - i.born).reduce((a, b) => a + b) / result.length).toFixed(2);

  return +result;
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
  let result = 0;
  let count = 0;

  if (!onlyWithSon) {
    for (let a = 0; a < people.length; a++) {
      for (let j = 0; j < people.length; j++) {
        if (people[a].name === people[j].mother) {
          result += people[j].born - people[a].born;
          count++;
        }
      }
    }

    return +(result / count).toFixed(2);
  } else {
    for (let a = 0; a < people.length; a++) {
      for (let j = 0; j < people.length; j++) {
        if (people[a].name === people[j].mother && people[j].sex === 'm') {
          result += people[j].born - people[a].born;
          count++;
        }
      }
    }
  }

  return +(result / count).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

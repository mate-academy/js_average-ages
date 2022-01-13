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
  const sumOfAges = people.reduce(
    (total, person) =>
      person.sex === 'm' && (arguments.length === 1
      || century === Math.ceil(person.died / 100))
        ? total + (person.died - person.born) : total, 0);

  const quantity = people.reduce(
    (total, person) =>
      person.sex === 'm' && (arguments.length === 1
      || century === Math.ceil(person.died / 100))
        ? total + 1 : total, 0);

  return Math.round(sumOfAges / quantity * 100) / 100;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
function calculateWomenAverageAge(people, withChildren = false) {
  let count = 0;

  const ageSum = people.reduce(
    (totalAges, person) => {
      if (person.sex === 'f') {
        if (withChildren === false) {
          count++;

          return totalAges + (person.died - person.born);
        } else {
          for (let i = 0; i < people.length; i++) {
            if (person.name === people[i].mother) {
              count++;

              return totalAges + (person.died - person.born);
            }
          }

          return totalAges;
        }
      } else {
        return totalAges;
      }
    }, 0);

  return ageSum / count;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let count = 0;
  const ageSum = people.reduce(
    (totalAges, person) => {
      let toAdd = 0;

      if (person.sex === 'f') {
        for (let i = 0; i < people.length; i++) {
          if (person.name === people[i].mother) {
            if (onlyWithSon === false || people[i].sex === 'm') {
              count++;
              toAdd += people[i].born - person.born;
            }
          }
        }
      }

      return totalAges + toAdd;
    }, 0
  );

  return Math.round(ageSum / count * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

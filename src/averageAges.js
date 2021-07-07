/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
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
  const men = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  return men.reduce((previous, current) => {
    return previous + (current.died - current.born);
  }, 0) / men.length;
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
  const women = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    : person.sex === 'f'
  );

  return women.reduce((previous, current) => {
    return previous + (current.died - current.born);
  }, 0) / women.length;
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
  let differenceInAge = 0;
  let counter = 0;

  const women = people.filter(person => person.sex === 'f');

  const sons = people.filter(person => person.sex === 'm');

  if (onlyWithSon) {
    women.forEach(woman => sons.forEach(son => {
      if (son.mother === woman.name) {
        differenceInAge += (son.born - woman.born);
        counter++;
      }
    }));
  } else {
    women.forEach(woman => people.forEach(child => {
      if (child.mother === woman.name) {
        differenceInAge += (child.born - woman.born);
        counter++;
      }
    }));
  }

  return differenceInAge / counter;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

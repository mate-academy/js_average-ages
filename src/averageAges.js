'use strict';

const calculateAverageAge = people => people.reduce(
  (count, human) => count + (human.died - human.born),
  0);

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
  const men = people.filter(
    century
      ? human => Math.ceil(human.died / 100) === century && human.sex === 'm'
      : human => human.sex === 'm'
  );

  return calculateAverageAge(men) / men.length;
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
  const women = people.filter(
    withChildren
      ? human => people.find(child => child.mother === human.name)
      : human => human.sex === 'f'
  );

  return calculateAverageAge(women) / women.length;
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
  const children = people.filter(
    onlyWithSon
      ? human =>
        people.some(child => child.name === human.mother)
        && human.sex === 'm'
      : human =>
        people.find(child => child.name === human.mother)
  );

  const difference = children.map(kid =>
    kid.born - people.find(child => child.name === kid.mother).born
  );

  return difference.reduce((count, value) => count + value) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

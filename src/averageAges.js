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
const MALE_SIGN = 'm';
const FEMALE_SIGN = 'f';

function countAverageAge(arr) {
  return arr.reduce((sum, { died, born }) =>
    sum + (died - born), 0) / arr.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    return century
      ? person.sex === MALE_SIGN && Math.ceil(person.died / 100) === century
      : person.sex === MALE_SIGN;
  });
  const averageAge = countAverageAge(men);

  return averageAge;
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
  const women = people.filter(person => {
    return withChildren
      ? person.sex === FEMALE_SIGN
        && people.some(son => son.mother === person.name)
      : person.sex === FEMALE_SIGN;
  });
  const averageAge = countAverageAge(women);

  return averageAge;
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
  const children = people.filter(person => {
    return onlyWithSon
      ? people.some(({ name }) => name === person.mother
        && person.sex === MALE_SIGN)
      : people.some(({ name }) => name === person.mother);
  });

  const ageDifference = children.reduce((sum, child) => {
    return sum + (child.born - people.find(({ name }) =>
      name === child.mother).born);
  }, 0);

  return ageDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men = people
    .filter(item => century === undefined
      ? item.sex === 'm'
      : item.sex === 'm' && Math.ceil(item.died / 100) === century);

  const ageSum = men
    .map(item => item.died - item.born)
    .reduce((sum, age) => sum + age, 0);

  const averageAge = ageSum / men.length;

  return +averageAge.toFixed(2);
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
  const women = people
    .filter(item => withChildren === undefined
      ? item.sex === 'f'
      : people.some(obj => item.name === obj.mother));

  const ageSum = women
    .map(item => item.died - item.born)
    .reduce((sum, age) => sum + age, 0);

  const averageAge = ageSum / women.length;

  return +averageAge.toFixed(2);
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const mothers = people
    .filter(item => onlyWithSon === undefined
      ? people.some(obj => item.name === obj.mother)
      : people.some(obj => item.name === obj.mother && obj.sex === 'm'));

  const ages = people
    .map(child => {
      const mother = mothers
        .find(person => onlyWithSon === undefined
          ? child.mother === person.name
          : child.sex === 'm' && child.mother === person.name);

      return mother ? child.born - mother.born : 0;
    })
    .filter(value => value !== 0);

  const sumOfAge = ages.reduce((sum, age) => sum + age, 0);
  const averageAge = sumOfAge / ages.length;

  return parseFloat(averageAge.toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

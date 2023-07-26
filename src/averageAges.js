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
    .filter(person => century === undefined
      ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century);

  const ageSum = men
    .map(person => person.died - person.born)
    .reduce((sum, age) => sum + age, 0);

  const averageAge = getAverageAge(ageSum, men);

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
  const women = people
    .filter(person => withChildren === undefined
      ? person.sex === 'f'
      : people.some(child => person.name === child.mother));

  const ageSum = women
    .map(person => person.died - person.born)
    .reduce((sum, age) => sum + age, 0);

  const averageAge = getAverageAge(ageSum, women);

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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const mothers = people
    .filter(person => onlyWithSon === undefined
      ? people.some(child => person.name === child.mother)
      : people.some(child => person.name === child.mother
        && child.sex === 'm'));

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
  const averageAge = getAverageAge(sumOfAge, ages);

  return averageAge;
}

// helper function for calculating the average age

function getAverageAge(sum, arr) {
  const averageAge = sum / arr.length;

  return +averageAge.toFixed(2);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

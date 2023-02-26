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
  const men = people.filter(({ sex, died }) => {
    return century
      ? Math.ceil(died / 100) === century && sex === 'm'
      : sex === 'm';
  });

  const calcAge = men.map(({ died, born }) => died - born);

  return calcAverageAge(calcAge);
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
  const women = people.filter(({ name, sex }) => {
    return withChildren
      ? people.some(({ mother }) => mother === name) && sex === 'f'
      : sex === 'f';
  });

  const calcAge = women.map(({ died, born }) => died - born);

  return calcAverageAge(calcAge);
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
  const children = people.filter(({ mother, sex }) => {
    return onlyWithSon
      ? people.some(({ name }) => name === mother) && sex === 'm'
      : people.some(({ name }) => name === mother);
  });

  const calcAge = children.map(({ mother, born }) => {
    const mom = people.find(({ name }) => name === mother);

    return born - mom.born;
  });

  return calcAverageAge(calcAge);
}

function calcAverageAge(arr) {
  return arr.reduce((sum, age) => sum + age, 0) / arr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

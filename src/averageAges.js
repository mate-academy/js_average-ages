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
    const menDied = Math.ceil(died / 100) === century;
    const isMen = sex === 'm';

    return century
      ? menDied && isMen
      : isMen;
  });

  const calculatedAge = men.map(({ died, born }) => died - born);

  return calculateAverageAge(calculatedAge);
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
    const womenWithChildren = people.some(({ mother }) => mother === name);
    const isWomen = sex === 'f';

    return withChildren
      ? womenWithChildren && isWomen
      : isWomen;
  });

  const calculatedAge = women.map(({ died, born }) => died - born);

  return calculateAverageAge(calculatedAge);
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
    const personIsMother = people.some(({ name }) => name === mother);
    const childIsMale = sex === 'm';

    return onlyWithSon
      ? personIsMother && childIsMale
      : personIsMother;
  });

  const calculatedAge = children.map(({ mother, born }) => {
    const mom = people.find(({ name }) => name === mother);

    return born - mom.born;
  });

  return calculateAverageAge(calculatedAge);
}

function calculateAverageAge(arr) {
  return arr.reduce((sum, age) => sum + age, 0) / arr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

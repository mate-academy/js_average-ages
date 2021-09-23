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
  const males = people.filter(({ sex, died }) => sex === 'm'
    && (century ? century === Math.ceil(died / 100) : true));
  const sumOfAges = males.reduce((acc, { born, died }) =>
    acc + (died - born), 0);

  return sumOfAges / males.length;
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
  const mothers = people.map(({ mother }) => mother);
  const females = people.filter(({ sex, name }) => sex === 'f'
      && (withChildren ? mothers.includes(name) : true));
  const sumOfAges = females.reduce((acc, { born, died }) =>
    acc + (died - born), 0);

  return sumOfAges / females.length;
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
  const mothers = people.map(({ mother }) => mother);
  const mothersBirthdays = people.reduce((acc, { name, born }) => {
    if (!mothers.includes(name)) {
      return acc;
    }

    return {
      ...acc,
      [name]: born,
    };
  }, {});
  const children = people.filter(({ mother, sex }) => mothersBirthdays[mother]
    && (onlyWithSon ? sex === 'm' : true));

  const sumOfDiff = children.reduce((acc, { born, mother }) =>
    acc + (born - mothersBirthdays[mother]), 0);

  return sumOfDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

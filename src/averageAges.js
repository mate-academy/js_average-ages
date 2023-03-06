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
 *
 */
const calculateAverageAge = function(array) {
  return array.reduce((sum, age) => sum + age, 0) / array.length;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const ages = people
    .filter(({ sex, died }) => sex === 'm'
    && (!century || century === Math.ceil(died / 100)))
    .map(({ born, died }) => died - born);

  return calculateAverageAge(ages) || 0;
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

const grabMothersNames = function(array) {
  return array.filter(({ mother }) => mother)
    .map(({ mother }) => mother);
};

function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const mothersNames = grabMothersNames(people);

  const ages = people
    .filter(({ sex, name }) => sex === 'f'
    && (!withChildren || mothersNames.includes(name)))
    .map(({ born, died }) => died - born);

  return calculateAverageAge(ages) || 0;
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
  // write code here
  const mothersNames = grabMothersNames(people);

  const mothersBirthDate = people
    .filter(({ name }) => mothersNames.includes(name))
    .reduce((acc, person) => {
      const { name, born } = person;

      acc[name] = born;

      return acc;
    }, {});

  const children = people
    .filter(({ mother, sex }) => mother
      && Object.keys(mothersBirthDate).includes(mother)
      && (!onlyWithSon || sex === 'm'));

  const ageDifferences = children
    .map(({ born, mother }) => born - mothersBirthDate[mother]);

  return calculateAverageAge(ageDifferences) || 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

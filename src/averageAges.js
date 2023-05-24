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
  const men = people.filter(person =>
    person.sex === 'm'
    && (century === undefined || Math.ceil(person.died / 100) === century));

  const sumMenAges = men.reduce((sum, data) =>
    sum + data.died - data.born, 0) / men.length;

  return sumMenAges;
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
  const women = people.filter(person =>
    person.sex === 'f'
    && (withChildren === undefined
    || people.find(mommy => mommy.mother === person.name))
  );

  const sumWomenAges = women.reduce((sum, data) =>
    sum + data.died - data.born, 0) / women.length;

  return sumWomenAges;
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
  const children = people.filter(person =>
    !onlyWithSon
      ? people.find(child => child.name === person.mother)
      : person.sex === 'm' && people.find(child =>
        child.name === person.mother));

  const mothers = people.filter(person =>
    person.sex === 'f'
    && (onlyWithSon === undefined
    || people.find(mommy => mommy.mother === person.name))
  );

  const diff = children.reduce((sum, data) =>
    sum + data.born - (mothers.find(mommy => mommy.name === data.mother).born
    ), 0) / children.length;

  return diff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

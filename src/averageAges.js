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
  return century > 0
    ? getMenAverageAge(people
      .filter(value => Math.ceil(value.died / 100) === century))
    : getMenAverageAge(people);
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
  const women = people.filter(value => value.sex === 'f');
  const mothers = getMothers(people);

  return withChildren
    ? calculateAverageAge(mothers)
    : calculateAverageAge(women);
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
  const mothers = getMothers(people);
  const childs = people
    .filter(v => v.mother)
    .filter(v => mothers.some(a => a.name === v.mother));
  const sons = childs.filter(v => v.sex === 'm');

  return onlyWithSon
    ? getAverageAgeDiff(sons, mothers)
    : getAverageAgeDiff(childs, mothers);
}

function getMenAverageAge(people) {
  return calculateAverageAge(people.filter(value => value.sex === 'm'));
}

function calculateAverageAge(people) {
  return people
    .map(value => value.died - value.born)
    .reduce((a, b) => (a + b), 0) / people.length;
}

function getAverageAgeDiff(people, mothers) {
  return people
    .map(value => value.born
      - mothers.find(v => v.name === value.mother).born)
    .reduce((a, b) => (a + b)) / people.length;
}

function getMothers(people) {
  const mothersNames = people
    .map(value => value.mother);

  return people
    .filter(value => mothersNames.includes(value.name));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

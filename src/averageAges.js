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
  const men = century
    ? people.filter(person => person.sex === 'm'
     && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const years = men
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / men.length;

  return +years.toFixed(2);
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
  const female = withChildren
    ? people.filter(mommy => people
      .find(child => (child.mother === mommy.name)))
    : people.filter(person => person.sex === 'f');

  const years = female
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / female.length;

  return +years.toFixed(2);
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
  const allkids = people
    .filter(child => people
      .find(mommy => child.mother === mommy.name));

  const sonsOnly = people
    .filter(child => people
      .find(mommy => child.mother === mommy.name && child.sex === 'm'));

  const difference = onlyWithSon
    ? sonsOnly.map(kid => kid.born - (people
      .find(mommy => kid.mother === mommy.name)).born)
      .reduce((a, b) => a + b) / sonsOnly.length
    : allkids.map(kid => kid.born - (people
      .find(mommy => kid.mother === mommy.name)).born)
      .reduce((a, b) => a + b) / allkids.length;

  return +difference.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

'use strict';

/**
 * Implement function
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
  const onlyMans = people.filter(({ sex }) => sex === 'm');
  const mansWithCentury = onlyMans.filter(({ died }) =>
    Math.ceil(died / 100) === century);
  const currentSearch = century ? mansWithCentury : onlyMans;

  const mansAges = currentSearch.map(({ born, died }) => died - born);
  const sumOfAges = mansAges.reduce((sum, current) => sum + current);

  return sumOfAges / mansAges.length;
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
  const onlyWomans = people.filter(({ sex }) => sex === 'f');
  const womanWithChildren = onlyWomans.filter(woman =>
    people.some(child => child.mother === woman.name));
  const currentSearch = withChildren ? womanWithChildren : onlyWomans;

  const womansAge = currentSearch.map(({ born, died }) => died - born);
  const sumOfAges = womansAge.reduce((sum, current) => sum + current);

  return sumOfAges / womansAge.length;
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
  const children = people
    .filter(child => people
      .some(woman => woman.name === child.mother));

  const son = people
    .filter(child => people
      .some(woman => child.mother === woman.name && child.sex === 'm'));

  const currentSearch = onlyWithSon ? son : children;
  const diff = currentSearch
    .map(child =>
      child.born - (people.find(woman => woman.name === child.mother)).born);

  const sumOfAges = diff.reduce((sum, age) => sum + age);

  return sumOfAges / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

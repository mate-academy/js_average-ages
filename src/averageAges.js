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
  const filterMenAge = century

    ? people.filter(({ sex, died }) =>
      (Math.ceil(died / 100) === century && sex === 'm'))

    : people.filter(({ sex }) => sex === 'm');

  const manAge = filterMenAge.reduce((sum, { born, died }) => (
    sum + (died - born)
  ), 0) / filterMenAge.length;

  return manAge;
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
  const filterWomenAge = withChildren

    ? people.filter(({ name }) => (
      people.find(({ mother }) => name === mother)))

    : people.filter(({ sex }) => sex === 'f');

  const WomenAge = filterWomenAge.reduce((sum, { born, died }) => (
    sum + (died - born)
  ), 0) / filterWomenAge.length;

  return WomenAge;
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
  const filterAgeDiff = onlyWithSon
    ? people.filter((child) =>
      people.find((mother) =>
        child.mother === mother.name) && child.sex === 'm')

    : people.filter((child) =>
      people.find((mother) => child.mother === mother.name));

  const AgeDiff = filterAgeDiff.reduce((diff, child) => {
    return diff + (child.born - people.find((mother) => (
      child.mother === mother.name)).born);
  }, 0) / filterAgeDiff.length;

  return AgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

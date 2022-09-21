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
  const mendDiedInThisCentury = century
    ? people.filter(person =>
      (person.sex === 'm')
      && (Math.ceil(person.died / 100) === century))
    : people.filter(person => person.sex === 'm');

  return mendDiedInThisCentury.reduce((sum, person) => (
    sum + (person.died - person.born)), 0)
    / mendDiedInThisCentury.length;
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
  // write code here
  const women = withChildren
    ? people.filter(person => (people.find(child =>
      child.mother === person.name)
      && person.sex === 'f'))
    : people.filter(person => person.sex === 'f');

  return women.reduce((sum, woman) => (
    sum + (woman.died - woman.born)), 0)
    / women.length;
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
  const ageGap = onlyWithSon
    ? people.filter(person => (
      people.find(women => person.mother === women.name)
      && person.sex === 'm'))
    : people.filter(person => (
      people.find(women => person.mother === women.name)));

  return ageGap.reduce((sum, person) => (
    sum + person.born - people.find(human => (
      person.mother === human.name)).born), 0)
      / ageGap.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

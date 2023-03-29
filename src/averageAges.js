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
  const filterByMenAndCent = century === undefined
    ? people.filter(e => e.sex === 'm')
    : people
      .filter(e => Math.ceil(e.died / 100) === century)
      .filter(e => e.sex === 'm');
  const averageAges = filterByMenAndCent
    .map(person => person.died - person.born)
    .reduce((accum, current) => accum + current) / filterByMenAndCent.length;

  return averageAges;
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
  let filterByWomenAndHasChild = people.filter(person => person.sex === 'f');

  filterByWomenAndHasChild = withChildren === true
    ? filterByWomenAndHasChild
      .filter(
        pers => people.find(person => person.mother === pers.name) !== undefined
      )
    : filterByWomenAndHasChild;

  let averageAges = filterByWomenAndHasChild
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / filterByWomenAndHasChild.length;

  averageAges = +averageAges.toFixed(2);

  return averageAges;
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
  const children = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.find(mother => mother.name === person.mother))
    : people.filter(person =>
      people.find(mother => mother.name === person.mother));

  const diffAge = children.map(child =>
    child.born - (people.find(mother => mother.name === child.mother)).born);

  const averageDiffAge = Math.round(diffAge.reduce((sumAge, ageNewMothers) =>
    sumAge + ageNewMothers, 0) * 100 / diffAge.length) / 100;

  return averageDiffAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

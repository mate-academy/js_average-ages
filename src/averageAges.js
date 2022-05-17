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
  const men = people.filter(person => person.sex === 'm');

  const arrOfAllAges = century
    ? men.filter(person =>
      Math.ceil(person.died / 100) === century).map(age => age.died - age.born)
    : men.map(age => age.died - age.born);

  const averageAge = arrOfAllAges.reduce(
    (sum, age) => sum + age, 0) / arrOfAllAges.length;

  return averageAge;
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
  const womenFilter = withChildren
    ? people.filter(person => people.find(child =>
      child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  ;

  const arrOfAllAges = womenFilter.map(age => age.died - age.born);

  const averageAge = arrOfAllAges.reduce(
    (sum, age) => sum + age, 0) / arrOfAllAges.length;

  return averageAge;
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
    .filter(child => people.some(person => child.mother === person.name));

  const childrenFilter = onlyWithSon
    ? children.filter(person => person.sex === 'm')
    : children;

  const averageAge = childrenFilter.reduce((sum, child) =>
    sum + (child.born - people.find(women =>
      child.mother === women.name).born), 0) / childrenFilter.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const getOnlyMen = people
    .filter(person => (century) ? Math.ceil(person.died / 100) === century
      && person.sex === 'm' : person.sex === 'm');
  const getMenAges = getOnlyMen.map(person => person.died - person.born);
  const callback = (sum, age) => sum + age;

  const getAverageMenAge = getMenAges.reduce(callback, 0) / getMenAges.length;

  return getAverageMenAge;
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
  const getOnlyWomen = people
    .filter(person => (withChildren)
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f');
  const getWomenAges = getOnlyWomen.map(person => person.died - person.born);
  const callback = (sum, age) => sum + age;

  const getAverageWomenAge = getWomenAges
    .reduce(callback, 0) / getWomenAges.length;

  return getAverageWomenAge;
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
  const getMothersWithChild = people
    .filter(person => (onlyWithSon)
      ? people.some(child => child.mother === person.name && child.sex === 'm')
      : people.some(child => child.mother === person.name));
  const getChildrenWithMother = people
    .filter(child => (onlyWithSon)
      ? people.some(person => child.mother === person.name && child.sex === 'm')
      : people.some(person => child.mother === person.name));

  const getAgesDifference = getChildrenWithMother
    .map(child => getMothersWithChild
      .filter(person => person.name === child.mother)
      .map(person => person.born) - child.born);

  const callback = (sum, age) => sum + Math.abs(age);

  const getAverageAge = getAgesDifference
    .reduce(callback, 0) / getAgesDifference.length;

  return getAverageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

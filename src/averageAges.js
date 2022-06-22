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
const getBySex = (people, sex) => people
  .filter(person => person.sex === sex);

function calculateMenAverageAge(people, century) {
  let men = getBySex(people, 'm');

  if (century) {
    men = men.filter(person => Math.ceil(person.died / 100) === century);
  }

  const getMenAges = men.map(person => person.died - person.born);
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
  let women = getBySex(people, 'f');

  if (withChildren) {
    women = women.filter(person => people
      .some(child => child.mother === person.name));
  }

  const getWomenAges = women.map(person => person.died - person.born);
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
const getMother = (people, onlyWithSon) => people
  .filter(person => people.some(child => child.mother === person.name));
const getChildren = (people, onlyWithSon) => people
  .filter(child => people.some(person => child.mother === person.name));

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = getMother(people);
  let children = getChildren(people);

  if (onlyWithSon) {
    children = getBySex(children, 'm');
  }

  const getAgesDifference = children
    .map(child => mothers
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

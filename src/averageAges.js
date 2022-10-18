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
  const men = filterBySex(people, 'm');
  const ages = !century ? men.map(el => el.died - el.born) : men.filter(
    person =>
      Math.ceil(person.died / 100) === century).map(el => el.died - el.born);

  return getAverageAge(ages);
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
  const womenMother = people.map(el => el.mother);
  const women = filterBySex(people, 'f');
  const ages = !withChildren ? women.map(el =>
    el.died - el.born) : women.filter(
    person => womenMother.includes(person.name)).map(el => el.died - el.born);

  return getAverageAge(ages);
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
  const childrenWithMoms = people.map(el => ({
    sex: el.sex,
    born: el.born,
    motherBorn: getMother(people, el.mother),
  })).filter(person => person.motherBorn !== undefined);
  const ages = !onlyWithSon ? childrenWithMoms.map(el =>
    el.born - el.motherBorn.born) : childrenWithMoms.filter(
    person => person.sex === 'm').map(el => el.born - el.motherBorn.born);

  return getAverageAge(ages);
}

function getMother(people, name) {
  return people.find(person => person.name === name);
}

function getAverageAge(ages) {
  return ages.reduce((sum, age) => (sum + age)) / ages.length;
}

function filterBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

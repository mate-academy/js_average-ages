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
  let menList;

  if (!century) {
    menList = people.filter(person => person.sex === 'm');
  } else {
    menList = people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);
  }

  return menList.reduce((a, b) => a + (b.died - b.born), 0) / menList.length;
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
  let womenList;

  if (!withChildren) {
    womenList = people.filter(person => person.sex === 'f');
  } else {
    womenList = people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name));
  }

  return womenList.reduce((a, b) =>
    a + (b.died - b.born), 0) / womenList.length;
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
  let children;

  if (!onlyWithSon) {
    children = people.filter(child =>
      people.some(mother => mother.name === child.mother));
  } else {
    children = people.filter(child =>
      people.some(mother =>
        mother.name === child.mother)
        && child.sex === 'm');
  }

  const ageDifferences = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  return ageDifferences.reduce((a, b) => a + b, 0) / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

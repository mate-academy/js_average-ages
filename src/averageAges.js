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
  const arrMan = (!century)
    ? people.filter((human) => human.sex === 'm')
    : people.filter((human) => human.sex === 'm'
      && Math.ceil(human.died / 100) === century);

  const averageAgeMan = arrMan.map((person) => person.died - person.born)
    .reduce((a, b) => a + b) / arrMan.length;

  return averageAgeMan;
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
  const arrWoman = (!withChildren)
    ? people.filter((human) => human.sex === 'f')
    : people.filter((mother) => mother.sex === 'f'
      && (people.find((person) => mother.name === person.mother)));

  const averageAgeWonam = arrWoman.map((person) => person.died - person.born)
    .reduce((a, b) => a + b) / arrWoman.length;

  return averageAgeWonam;
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
  const arrDiffAge = (!onlyWithSon)
    ? people.filter(child =>
      people.find(mother => child.mother === mother.name))
    : people.filter(child =>
      people.find(mother => child.mother === mother.name) && child.sex === 'm');

  const averageAgeDiff = arrDiffAge.reduce((count, child) =>
    count + (child.born - people.find(mother =>
      child.mother === mother.name).born), 0) / arrDiffAge.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

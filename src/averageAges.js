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
  const arrMan = people.filter(a => a.sex === 'm');
  const arrManCen = arrMan.filter(a => Math.ceil(a.died / 100) === century);

  return century
    ? arrManCen
      .map(a => a.died - a.born)
      .reduce((a, x) => a + x, 0) / arrManCen.length
    : arrMan
      .map(a => a.died - a.born)
      .reduce((a, x) => a + x, 0) / arrMan.length;
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
  const arrWo = people.filter(a => withChildren
    ? a.sex === 'f' && people.some(b => b.mother === a.name)
    : a.sex === 'f');

  return arrWo.map(a => a.died - a.born)
    .reduce((a, x) => a + x, 0) / arrWo.length;
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
  const arrManWithMo = people.filter(a => onlyWithSon
    ? a.sex === 'm' && people.some(b => b.name === a.mother)
    : people.some(b => b.name === a.mother));

  const difAge = arrManWithMo.map(a => {
    const mother = people.find(b => a.mother === b.name);

    return a.born - mother.born;
  });

  return difAge.reduce((a, x) => a + x, 0) / difAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const menOld = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  return menOld.map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / menOld.length;
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
  const womenOld = people.filter(person => withChildren
    ? people.some(human => human.mother === person.name)
    : person.sex === 'f');

  return womenOld.map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / womenOld.length;
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
  const childHas = (!onlyWithSon)
    ? people.filter(person =>
      people.some(mother =>
        mother.name === person.mother))
    : people.filter(person =>
      people.some(mother =>
        mother.name === person.mother && person.sex === 'm'));

  return childHas.map(person =>
    person.born - people.find(mother => person.mother === mother.name).born)
    .reduce((a, b) => a + b, 0) / childHas.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

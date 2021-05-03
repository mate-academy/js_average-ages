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
  const menAverageAge = people.filter(man => century
    ? Math.ceil(man.died / 100) === century && man.sex === 'm'
    : man.sex === 'm');

  return menAverageAge.reduce((sum, { born, died }) =>
    sum + (died - born), 0) / menAverageAge.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenAverageAge = people.filter(women => withChildren
    ? people.some(haveChild => haveChild.mother === women.name)
    && women.sex === 'f'
    : women.sex === 'f');

  return womenAverageAge.reduce((sum, { born, died }) =>
    sum + (died - born), 0) / womenAverageAge.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(mother =>
    people.some(haveChild => haveChild.mother === mother.name)
    && mother.sex === 'f');

  const sons = people.filter(son => onlyWithSon
    ? mothers.some(child => child.name === son.mother)
    && son.sex === 'm'
    : mothers.some(child => child.name === son.mother));

  return sons.reduce((sum, persone) =>
    sum + (persone.born
      - mothers.find(women => persone.mother === women.name).born)
  , 0) / sons.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

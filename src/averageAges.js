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
  let men = people.filter(p => p.sex === 'm');

  if (century) {
    men = men.filter(p => (
      Math.ceil(p.died / 100) === century
    ));
  }

  const sum = men.map(p => p.died - p.born).reduce((prev, cur) => (
    prev + cur
  ), 0);

  return sum / men.length;
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
  let women = people.filter(p => p.sex === 'f');

  if (withChildren) {
    women = women.filter(w => (
      people.some(p => p.mother === w.name)
    ));
  }

  const sum = women.map(p => p.died - p.born).reduce((prev, cur) => (
    prev + cur
  ), 0);

  return sum / women.length;
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
  let withMothersInList = people.filter(p => {
    const isMotherInList = people.find(person => p.mother === person.name);

    return isMotherInList;
  });

  if (onlyWithSon) {
    withMothersInList = withMothersInList.filter(p => p.sex === 'm');
  }

  const sum = withMothersInList.map(p => {
    const motherBorn = people.find(person => p.mother === person.name).born;

    return p.born - motherBorn;
  }).reduce((cur, prev) => cur + prev, 0);

  return sum / withMothersInList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

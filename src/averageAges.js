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
  const menArray = (!century)
    ? people.filter((human) => human.sex === 'm')
    : people.filter((human) => (human.sex === 'm'
      && Math.ceil(human.died / 100) === century));

  const averageAgeMan = averageAge(menArray);

  return averageAgeMan;
}

function averageAge(array) {
  return array.map((person) => person.died - person.born)
    .reduce((sum, currentAge) => sum + currentAge) / array.length;
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
  const womenArray = (!withChildren)
    ? people.filter((human) => human.sex === 'f')
    : people.filter((mother) => (mother.sex === 'f'
      && (people.find((person) => mother.name === person.mother))));

  const averageAgeWonam = averageAge(womenArray);

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
    ? people.filter(child => people
      .some(mother => child.mother === mother.name))

    : people.filter(child => (
      people.some(mother => child.mother === mother.name) && child.sex === 'm'
    ));

  const averageAgeDiff = arrDiffAge
    .map(child => {
      const motherBorn = people.find(mother => (
        child.mother === mother.name)).born;

      return child.born - motherBorn;
    }).reduce((sum, currentAge) => sum + currentAge) / arrDiffAge.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

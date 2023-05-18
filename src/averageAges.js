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
  const selection = people.filter(
    man => {
      const check = man.sex === 'm' && century
        ? man.sex === 'm' && Math.ceil(man.died / 100) === century
        : man.sex === 'm';

      return check;
    });

  const avg = selection.reduce((sumAvg, man) => (
    man.died - man.born) / selection.length + sumAvg, 0
  );

  return avg;
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
  const selection = people.filter(woman => {
    const check = woman.sex === 'f' && withChildren
      ? woman.sex === 'f' && people.some(child => child.mother === woman.name)
      : woman.sex === 'f';

    return check;
  });

  const avgFemale = selection.reduce(
    (sumAvg, woman) => sumAvg + (woman.died - woman.born) / selection.length
    , 0);

  return avgFemale;
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
  const selection = people.filter(person => {
    const motherInList = people.some(mother => mother.name === person.mother);
    const check = onlyWithSon
      ? person.sex === 'm' && motherInList === true
      : motherInList === true;

    return check;
  });

  const differenceAvg = selection.reduce((sumAvg, person) => {
    const findMother = people.find(mother => mother.name === person.mother);
    const motherBirth = findMother.born;
    const avgDiff = sumAvg + (person.born - motherBirth) / selection.length;

    return avgDiff;
  }, 0);

  return differenceAvg;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men = people.filter((person) => (person.sex === 'm' && century)
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  return men.reduce(
    (sumAvg, person) => avaregeAge(person.died, person.born, men.length, sumAvg)
    , 0);
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
  const women = people.filter((person) => {
    const hasChild = people.some((child) => child.mother === person.name);

    return (person.sex === 'f' && withChildren)
      ? person.sex === 'f' && hasChild
      : person.sex === 'f';
  });

  return women.reduce((sumAvg, person) =>
    avaregeAge(person.died, person.born, women.length, sumAvg), 0);
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
  const hasMotherData = people.filter((person) => {
    const motherInList = people.some((mother) => mother.name === person.mother);

    return onlyWithSon ? person.sex === 'm' && motherInList : motherInList;
  });

  const avgAgeDiff = hasMotherData.reduce((sumAvg, person) => {
    const motherBorn = people.find((mother) => mother.name === person.mother)
      .born;

    return avaregeAge(person.born, motherBorn, hasMotherData.length, sumAvg);
  }, 0);

  return avgAgeDiff;
}

function avaregeAge(minuendAge, subtrahendAge, persons, prev) {
  return (minuendAge - subtrahendAge) / persons + prev;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

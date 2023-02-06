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
  const manAges = people.filter((person) => {
    return (century !== undefined
      ? person.sex === 'm' && (Math.ceil(person.died / 100)) === century
      : person.sex === 'm');
  });

  const sumOfManAges = manAges.reduce((person1, person2) => {
    return person1 + (person2.died - person2.born);
  }, 0);

  return sumOfManAges / manAges.length;
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
  const motherAges = people.filter((person) => {
    return (withChildren !== undefined
      ? person.sex === 'f' && people.find(
        (child) => child.mother === person.name)
      : person.sex === 'f');
  });

  const sumOfMotherAges
  = motherAges.reduce((person1, person2) => {
    return person1 + (person2.died - person2.born);
  }, 0);

  return (sumOfMotherAges / motherAges.length);
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
  const motherAndSon = people.map((child) => {
    return [child, people.find(
      (mother) => onlyWithSon !== undefined
        ? mother.name === child.mother && child.sex === 'm'
        : mother.name === child.mother)];
  });

  const filteredMotherAndSonAges = motherAndSon.filter((person) => {
    return !person.includes(undefined);
  });

  const agesOfMotherAndSon = filteredMotherAndSonAges.map((person) => {
    return person[0].born - person[1].born;
  });

  return agesOfMotherAndSon.reduce((a, b) => a + b, 0)
  / agesOfMotherAndSon.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

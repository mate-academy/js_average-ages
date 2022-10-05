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
  let man = people.filter(person => person.sex === 'm');

  if (century) {
    man = man.filter(
      person => century === Math.ceil(person.died / 100));
  }

  const totalAge = man.reduce(
    (sum, person) => sum + (person.died - person.born), 0);

  const totalAgeAverage = totalAge / man.length;

  return Math.round(totalAgeAverage * 100) / 100;
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
  let woman = people.filter(person => person.sex === 'f');
  const listMother = people.map(x => x.mother);
  const womanWithChildren = woman.filter(x => listMother.includes(x.name));

  if (withChildren) {
    woman = womanWithChildren;
  }

  const totalAge = woman.reduce(
    (sum, person) => sum + (person.died - person.born), 0);

  const totalAgeAverage = totalAge / woman.length;

  return Math.round(totalAgeAverage * 100) / 100;
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
  const arrDifferenceYears = people.map(person => {
    const mother = people.find(x => {
      if (onlyWithSon) {
        return person.mother === x.name && person.sex === 'm';
      } else {
        return person.mother === x.name;
      }
    });

    if (mother) {
      return person.born - mother.born;
    }
  }).filter(number => number !== undefined);

  const totalAge = arrDifferenceYears.reduce(
    (sum, DifferenceYear) => sum + DifferenceYear, 0);

  const totalAgeAverage = totalAge / arrDifferenceYears.length;

  return Math.round(totalAgeAverage * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

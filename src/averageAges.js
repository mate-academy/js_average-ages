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
function getAvarage(arrayWithYears) {
  return arrayWithYears.reduce((acc, years) => acc + years, 0)
  / arrayWithYears.length;
}

function calculateMenAverageAge(people, century) {
  const arrayWithYears = people.filter(
    century
      ? person => person.sex === 'm'
        && Math.ceil(person.died / 100) === century
      : person => person.sex === 'm')
    .map((person) => {
      return person.died - person.born;
    });

  return getAvarage(arrayWithYears);
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
  const arrayWithYears = people.filter(
    withChildren
      ? (person) => people.some((mother) => person.name === mother.mother)
      : (person) => person.sex === 'f'
  ).map((person) => {
    return person.died - person.born;
  });

  return getAvarage(arrayWithYears);
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
  const result = [];

  people.forEach((person) => {
    if (onlyWithSon ? (person.sex === 'm' && person.mother) : person.mother) {
      const mother = people.find((p) => p.name === person.mother);

      if (mother) {
        const ageDiff = person.born - mother.born;

        result.push(ageDiff);
      }
    }
  });

  return getAvarage(result);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

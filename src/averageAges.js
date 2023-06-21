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

function calculateMenAverageAge(people, century = 0) {
  const manAges = people.filter(person => person.sex === 'm'
  && (century ? century === Math.ceil(person.died / 100) : true))
    .map(person => person.died - person.born);

  return manAges.reduce((acc, curr) => acc + curr, 0) / manAges.length;
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
  const womanAges = people.filter(person => person.sex === 'f'
  && (withChildren ? people
    .some((child) => child.mother === person.name) : true))
    .map(person => person.died - person.born);

  return womanAges.reduce((acc, curr) => acc + curr, 0) / womanAges.length;
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
  if (onlyWithSon) {
    const filteredPeople = people.filter((person) => {
      return person.sex === 'm';
    });

    const ageDifferences = filteredPeople.map((person) => {
      const mother = people.find((mom) => {
        return person.mother === mom.name;
      });

      if (mother) {
        return person.born - mother.born;
      }

      return null;
    });

    const filteredAgeDiffs = ageDifferences.filter((ageDif) => {
      return ageDif !== null;
    });

    const totalAgeDifferences = filteredAgeDiffs.reduce((previous, current) => {
      return previous + current;
    }, 0);

    return totalAgeDifferences / filteredAgeDiffs.length;
  } else {
    const ageDifferences = people.map((person) => {
      const mother = people.find((mom) => {
        return person.mother === mom.name;
      });

      if (mother) {
        return person.born - mother.born;
      }

      return null;
    });

    const filteredAgeDiffs = ageDifferences.filter((ageDif) => {
      return ageDif !== null;
    });

    const totalAgeDifferences = filteredAgeDiffs.reduce((previous, current) => {
      return previous + current;
    }, 0);

    return totalAgeDifferences / filteredAgeDiffs.length;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

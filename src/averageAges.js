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
  const arrayWithYears = people
    .filter((person) => {
      return century ? person.sex === 'm'
      && Math.ceil(person.died / 100) === century : person.sex === 'm';
    })
    .map((person) => {
      return person.died - person.born;
    });

  const yearsAmount = arrayWithYears.reduce((acc, years) => acc + years, 0);

  return yearsAmount / arrayWithYears.length;
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
  const arrayWithMothers = people
    .filter((person) => {
      return person.mother;
    })
    .map((person) => {
      return person.mother;
    });
  const arrayWithYears = people
    .filter((person) => {
      return withChildren ? person.sex === 'f'
      && arrayWithMothers.includes(person.name) : person.sex === 'f';
    })
    .map((person) => {
      return person.died - person.born;
    });

  const yearsAmount = arrayWithYears.reduce((acc, years) => acc + years, 0);

  return yearsAmount / arrayWithYears.length;
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
  const objWithYears = {};
  const children = people
    .filter((person) => {
      return onlyWithSon ? person.sex === 'm' && person.mother : person.mother;
    });
  const mothersName = people
    .filter((person) => {
      return person.mother;
    })
    .map((person) => {
      return person.mother;
    });
  const mothers = people
    .filter((person) => {
      return mothersName.includes(person.name);
    });

  mothers.forEach((mother) => {
    objWithYears[mother.name] = mother.born;
  });

  const result = children
    .map((child) => {
      return objWithYears[child.mother]
      && child.born - objWithYears[child.mother];
    })
    .filter((years) => years);

  return result.reduce((acc, years) => acc + years, 0) / result.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

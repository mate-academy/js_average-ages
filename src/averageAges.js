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
  const men = people.filter(({ sex }) => sex === 'm');

  const diedInCentury = men.filter(({ died }) =>
    Math.ceil(died / 100) === century);

  const deadMen = century ? diedInCentury : men;

  return deadMen.reduce((years, man, i, arr) =>
    years + (man.died - man.born) / arr.length, 0);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const women = people.filter(({ sex }) => sex === 'f');

  const mothers = women.filter(({ name }) =>
    people.some(({ mother }) => mother === name),
  );

  const womenOrMothers = withChildren ? mothers : women;

  return womenOrMothers.reduce((years, woman, i, arr) =>
    years + (woman.died - woman.born) / arr.length, 0);
}

// calculateWomenAverageAge(people);

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
  const mothers = people.filter(({ name }) =>
    people.some(({ mother }) => name === mother));

  const children = people.filter(({ mother, sex }) => (onlyWithSon)
    ? people.some(({ name }) => mother === name) && sex === 'm'
    : people.some(({ name }) => mother === name));

  const ageDiff = children.map(({ born, mother }) =>
    born - mothers.find(({ name }) => name === mother).born);

  return ageDiff.reduce((years, age, i, arr) =>
    years + age / arr.length, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

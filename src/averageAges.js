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
  const averageAgeMan = people
    .filter((person) => century ? person.sex === 'm'
    && Math.ceil(person.died / 100) === century : person.sex === 'm')
    .map((getAge) => getAge.died - getAge.born);

  const average = averageAgeMan
    .reduce((sum, age) => sum + age / averageAgeMan.length, 0);

  return +average.toFixed(2);
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
  const averageAgeWoman = people
    .filter(({ sex, name }) => {
      return withChildren ? sex === 'f'
      && people.some(child => child.mother === name)
        : sex === 'f';
    })
    .map((getAge) => getAge.died - getAge.born);

  const average = averageAgeWoman
    .reduce((sum, age) => sum + age, 0);

  const result = average / averageAgeWoman.length;

  return +result.toFixed(2);
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
  const ageDiff = people
    .filter(({ mother, sex }) => {
      return onlyWithSon ? people.some(child => child.name === mother
        && sex === 'm')
        : people.some(child => child.name === mother);
    })
    .map((child) => {
      const mother = people.find((mothers) => mothers.name === child.mother);

      return child.born - mother.born;
    });
  const average = ageDiff
    .reduce((sum, age) => sum + age, 0);

  const result = average / ageDiff.length;

  return +result.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

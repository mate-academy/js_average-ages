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
  const result = people
    .filter(person => person.sex === 'm'
      && (Math.ceil(person.died / 100) === century || arguments.length < 2))
    .map(person => person.died - person.born);

  return result.reduce((avg, age) => avg + age) / result.length;
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
  const mother = arguments.length >= 2
    ? people
      .map(person => person.mother)
    : null;

  const result = people
    .filter(person => person.sex === 'f'
      && (mother === null || mother.find(name => person.name === name)))
    .map(person => person.died - person.born);

  return result.reduce((avg, age) => avg + age) / result.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const motherNames = people
    .map(person => person.mother);

  const mothers = people
    .filter(person => motherNames.find(name => person.name === name));

  const result = people
    .filter(person => person.mother !== null
      && mothers.find(mother => mother.name === person.mother)
      && (!onlyWithSon || person.sex === 'm'))
    .map(person => person.born
      - mothers.find(mother => mother.name === person.mother).born);

  return result.reduce((avg, age) => avg + age) / result.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

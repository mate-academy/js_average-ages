'use strict';
/**
 * @param {number} sum
 * @param {number} length
 *
 * @return {number}
 */
const getAverage = (sum, length) => Math.round(sum / length * 100) / 100 || 0;

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
  const filteredPeople = people.filter(
    person => person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century)
  );

  const sumAges = filteredPeople
    .reduce((sum, person) => sum + person.died - person.born, 0);

  return getAverage(sumAges, filteredPeople.length);
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
function calculateWomenAverageAge(people, withChildren = false) {
  const filteredPeople = people.filter(
    ({ name, sex }) => sex === 'f'
      && (!withChildren || people.some((person) => person.mother === name))
  );

  const sumAges = filteredPeople
    .reduce((sum, person) => sum + person.died - person.born, 0);

  return getAverage(sumAges, filteredPeople.length);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Te function returns an average age difference between a child and his or her
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
  const getMother = (childMotherName) => (
    people.find(mother => childMotherName === mother.name)
  );

  const children = people
    .filter(({ sex, mother }) => (
      getMother(mother) && (!onlyWithSon || sex === 'm')
    ));

  const ageSum = children.reduce((sum, { born, mother }) => (
    sum + born - getMother(mother).born
  ), 0);

  return getAverage(ageSum, children.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

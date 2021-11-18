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
const calculateMenAverageAge = (people, century) => {
  const men = century ? people.filter(person =>
    person.sex === 'm' && (Math.ceil(person.died / 100) === century))
    : people.filter(person => person.sex === 'm');

  const sumOfAge = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return sumOfAge / men.length;
};

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
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
const calculateWomenAverageAge = (people, withChildren) => {
  const woman = withChildren ? people.filter(person =>
    person.sex === 'f' && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const sumOfAge = woman.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return sumOfAge / woman.length;
};

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
const calculateAverageAgeDiff = (people, onlyWithSon) => {
  const ageDiff = onlyWithSon ? people.filter(({ sex, mother }) => sex === 'm'
    && people.some(({ name }) => name === mother))
    : people.filter(({ mother }) => people.some(({ name }) => name === mother));

  ageDiff.map(child => {
    const mother = people.find(({ name }) => name === child.mother);

    child.motherAgeInBirth = child.born - mother.born;

    return child;
  });

  const sumOfAge = ageDiff.reduce((sum, { motherAgeInBirth }) =>
    sum + motherAgeInBirth, 0);

  return sumOfAge / ageDiff.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

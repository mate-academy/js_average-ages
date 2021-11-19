'use strict';

const sumOfAge = (human) => {
  const result = human.reduce((sum, person) => (
    sum + (person.died - person.born)
  ), 0);

  return result / human.length;
};

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
  const men = people.filter(person =>
    century
      ? person.sex === 'm' && (Math.ceil(person.died / 100) === century)
      : person.sex === 'm'
  );

  return sumOfAge(men);
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
  const woman = people.filter(person =>
    withChildren
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f'
  );

  return sumOfAge(woman);
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
  const woman = people.filter(({ sex, mother }) =>
    onlyWithSon
      ? sex === 'm' && people.some(({ name }) => name === mother)
      : people.some(({ name }) => name === mother)
  );

  const ageDiff = woman.map(child => {
    const mother = people.find(({ name }) => name === child.mother);

    child.motherAgeInBirth = child.born - mother.born;

    return child;
  });

  const totalAges = ageDiff.reduce((sum, { motherAgeInBirth }) => (
    sum + motherAgeInBirth
  ), 0);

  return totalAges / ageDiff.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

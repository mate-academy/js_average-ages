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
  const men = people.filter(person => {
    if (century) {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    } else {
      return person.sex === 'm';
    }
  });
  const age = men.map(person => person.died - person.born);
  const averageAge = age.reduce((a, b) => (a + b), 0) / age.length;

  return averageAge;
}

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
function calculateWomenAverageAge(people, withChildren) {
  const woman = people.filter(person => {
    if (withChildren) {
      return person.sex === 'f' && people.some(
        child => person.name === child.mother
      );
    } else {
      return person.sex === 'f';
    }
  });

  const age = woman.map(person => person.died - person.born);
  const averageAge = age.reduce((a, b) => (a + b), 0) / age.length;

  return averageAge;
}

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
  const sons = people.filter(person => {
    if (onlyWithSon) {
      return person.sex === 'm' && people.some(
        mother => mother.name === person.mother
      );
    } else {
      return people.some(
        mother => mother.name === person.mother
      );
    }
  });

  const differenceAge = sons.map(son => son.born - people.find(
    mother => mother.name === son.mother).born
  );
  const averageDifference = differenceAge.reduce(
    (a, b) => (a + b), 0) / differenceAge.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

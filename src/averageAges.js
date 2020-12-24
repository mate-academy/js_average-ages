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
  const men = people.filter(person =>
    !century
      ? person.sex === 'm'
      : Math.ceil(person.died / 100) === century && person.sex === 'm'
  );
  const averageAge = (men
    .reduce((acc, person) =>
      acc + (person.died - person.born), 0)) / men.length;

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
  const woman = people.filter(person =>
    !withChildren
      ? person.sex === 'f'
      : people.some(potentialChild => potentialChild.mother === person.name)
  );

  const averageAge = (woman
    .reduce((acc, person) =>
      acc + (person.died - person.born), 0)) / woman.length;

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
  const women = people.filter(child =>
    !onlyWithSon
      ? people.some(person =>
        child.mother === person.name
      )
      : people.some(person =>
        child.mother === person.name && child.sex === 'm'
      )
  );

  const averageAge = women
    .map(child => (child.born) - (people
      .find(mother => mother.name === child.mother)).born)
    .reduce((acc, age) => acc + age, 0) / women.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const filteredPeople = people.filter(
    century
      ? person => Math.ceil(person.died / 100) === century
        && person.sex === 'm'
      : person => person.sex === 'm'
  );

  return filteredPeople.reduce((sum, current) => {
    return sum + (current.died - current.born);
  }, 0) / filteredPeople.length;
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
  const filteredPeople = people.filter(
    withChildren
      ? person => people.find(child => child.mother === person.name)
      : person => person.sex === 'f'
  );

  return filteredPeople.reduce((sum, current) => {
    return sum + (current.died - current.born);
  }, 0) / filteredPeople.length;
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
  const mothers = people.filter(mother => mother.sex === 'f');
  const children = people.filter(person => onlyWithSon
    ? people.find(child => child.name === person.mother && person.sex === 'm')
    : people.find(child => child.name === person.mother)
  );

  const ageDifference = children.map(child => {
    const childMother = mothers.find(mother => child.mother === mother.name);

    return child.born - childMother.born;
  });

  const averageAgeDiff = ageDifference.reduce((acc, motherAge) => {
    return (acc + motherAge);
  }, 0) / ageDifference.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

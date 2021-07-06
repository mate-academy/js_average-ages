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
  const malePeople = people.filter(
    century
      ? person => person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person => person.sex === 'm'
  );

  return malePeople.reduce(
    (acc, person) => acc + (person.died - person.born)
    , 0) / malePeople.length;
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
  const femalePeople = people.filter(
    person => withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
  );

  return femalePeople.reduce(
    (acc, person) => acc + (person.died - person.born)
    , 0) / femalePeople.length;
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

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(mother => mother.sex === 'f');

  const children = people.filter(
    person => onlyWithSon
      ? people.find(child => child.name === person.mother && person.sex === 'm')
      : people.find(child => child.name === person.mother)
  );

  const ageDifference = children.map(child => {
    const motherOfChild = mothers.find(mother => child.mother === mother.name);

    return child.born - motherOfChild.born;
  });

  const averageMothersAge = ageDifference.reduce((sum, motherAge) =>
    sum + motherAge) / ageDifference.length;

  return averageMothersAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

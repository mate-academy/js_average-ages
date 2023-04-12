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
  const men = people.filter(person => (
    century ? person.sex === 'm'
    && Math.ceil(person.died / 100) === century : person.sex === 'm'
  ));

  const ageSum = men.reduce((sum, man) =>
    sum + (man.died - man.born), 0);

  return ageSum / men.length;
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
  const women = withChildren ? people.filter(person => people.some(human =>
    person.name === human.mother))
    : people.filter(person => person.sex === 'f');

  const ageSum = women.reduce((sum, woman) =>
    sum + woman.died - woman.born, 0);

  return ageSum / women.length;
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
  const mothers = people.filter(person => people.some(human =>
    human.mother === person.name));

  const children = onlyWithSon ? people
    .filter(person => person.sex === 'm') : people;

  const ageDifferences = children.map(child => {
    const searchedMother = mothers.find(mother =>
      mother.name === child.mother);

    return searchedMother ? child.born - searchedMother.born : 0;
  }).filter(Boolean);

  const ageDiffSum = ageDifferences.reduce((sum, ageDiff) =>
    sum + ageDiff, 0);

  return ageDiffSum / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

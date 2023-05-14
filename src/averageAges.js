'use strict';

function getAverageAge(personAges) {
  return personAges.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / personAges.length;
}

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
  const men = century
    ? people.filter(person =>
      Math.ceil(person.died / 100) === century && person.sex === 'm')
    : people.filter(person =>
      person.sex === 'm');

  return getAverageAge(men);
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
  const women = withChildren
    ? people.filter(person =>
      people.some(child =>
        child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return getAverageAge(women);
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
  const childrenWithMother = onlyWithSon
    ? people.filter(person =>
      people.some(p => p.name === person.mother) && person.sex === 'm')
    : people.filter(person =>
      people.some(p => p.name === person.mother));

  const diffAges = childrenWithMother.map(child => {
    const mother = people.find(person => person.name === child.mother);
    const diffAge = child.born - mother.born;

    return diffAge;
  });

  const avgAge = diffAges.reduce((sum, age) =>
    sum + age, 0) / diffAges.length;

  return avgAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

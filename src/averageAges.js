'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function getAverageAge(sex) {
  return sex
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / sex.length;
}

function calculateMenAverageAge(people, century) {
  const men = (century)
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

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
  const women = (withChildren)
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
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
function hasMother(crowd, humanMother) {
  return crowd.some(someone => someone.name === humanMother);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = (onlyWithSon)
    ? people.filter(person => person.sex === 'm'
      && hasMother(people, person.mother))
    : people.filter(person => hasMother(people, person.mother));

  return children.reduce((sum, son) => {
    const mother = people.find(mom => mom.name === son.mother);
    const age = son.born - mother.born;

    return sum + age;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

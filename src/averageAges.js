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
function getAverageAge(filteredPeople) {
  const personAge = filteredPeople.map(person => person.died - person.born);
  const averageAge = personAge.reduce((a, b) => a + b) / personAge.length;

  return Math.round(averageAge * 100) / 100;
}

function calculateMenAverageAge(people, century) {
  const male = people.filter(
    century
      ? person => person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person => person.sex === 'm');

  return getAverageAge(male);
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
  const female = people.filter(
    withChildren
      ? mother => people.find(child => child.mother === mother.name)
      : person => person.sex === 'f');

  return getAverageAge(female);
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
  const findMother = (childMother) => {
    return people.find(mother => childMother === mother.name);
  };

  const children = people.filter(
    child => findMother(child.mother) && (!onlyWithSon || child.sex === 'm'));

  const sumAges = children.reduce((sum, child) => (
    child.born + sum - findMother(child.mother).born
  ), 0);

  const averageAge = sumAges / children.length;

  return Math.round(averageAge * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

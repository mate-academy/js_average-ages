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
  const men = century
    ? people.filter(person => Math.ceil(person.died / 100) === century
    && person.sex === 'm') : people.filter(person => person.sex === 'm');

  const totalMenAge = men.reduce((acc, person) =>
    acc + (person.died - person.born), 0);

  return totalMenAge / men.length;
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
      people.some(mother => person.name === mother.mother)
    && person.sex === 'f') : people.filter(person => person.sex === 'f');

  const totalWomenAge = women.reduce((acc, person) =>
    acc + (person.died - person.born), 0);

  return totalWomenAge / women.length;
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
  const children = onlyWithSon
    ? people.filter(person =>
      people.some(child => child.name === person.mother)
      && person.sex === 'm')
    : people.filter(person =>
      people.some(child => child.name === person.mother));

  let totalMotherAge = 0;

  children.forEach(person => {
    const mothers = people.find(mother => mother.name === person.mother);

    if (mothers) {
      const difference = person.born - mothers.born;

      totalMotherAge += difference;
    }
  });

  return totalMotherAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

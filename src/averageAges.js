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
  const men = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person =>
      (person.sex === 'm' && Math.ceil(person.died / 100) === century));

  const totalAge = men
    .reduce((prev, person) => prev + (person.died - person.born), 0);

  const menAverageAge = men.length ? totalAge / men.length : 0;

  return menAverageAge;
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
  const women = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(person =>
      (person.sex === 'f' && haveChildren(people, person.name)));

  const totalAge = women
    .reduce((prev, person) => prev + (person.died - person.born), 0);

  const womenAverageAge = women.length ? totalAge / women.length : 0;

  return womenAverageAge;
}

function haveChildren(group, name) {
  return group.some(person => person.mother === name);
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
  const group = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const ageGaps = group
    .map(person => {
      const mother = people.find(woman => woman.name === person.mother);

      return mother ? person.born - mother.born : null;
    })
    .filter(gap => gap);

  const averageAgeDiff = ageGaps.reduce((a, b) => a + b)
    / ageGaps.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

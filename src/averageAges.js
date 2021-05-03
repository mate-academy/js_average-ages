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
  const men = (century
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people)
    .filter(person => person.sex === 'm');

  return avgAge(men);
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
  let women = people
    .filter(person => person.sex === 'f');

  women = withChildren
    ? women.filter(woman => {
      const name = woman.name;

      return people.some(person => name === person.mother);
    })
    : women;

  return avgAge(women);
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
  const humans = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const ageDiff = humans
    .filter(person => person.mother)
    .map(person => {
      const mother = people.find(human => person.mother === human.name);

      return mother ? person.born - mother.born : null;
    })
    .filter(number => number !== null);

  const sumAgeDiff = ageDiff.reduce((sum, number) => sum + number, 0);

  return (sumAgeDiff / ageDiff.length) || null;
}

function avgAge(people) {
  const sumAges = people.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0);

  return (sumAges / people.length) || null;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

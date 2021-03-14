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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let peopleFilterArrey;

  (arguments.length > 1) ? peopleFilterArrey = people
    .filter((person) => person.sex === 'm' && Math
      .ceil(person.died / 100) === century) : peopleFilterArrey = people
    .filter((person) => person.sex === 'm');

  const agePerson = peopleFilterArrey
    .map((person) => person.died - person.born);
  const averageAge = agePerson
    .reduce((a, b) => a + b, 0) / agePerson.length;

  return +averageAge.toFixed(2);
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
  let peopleFilterArrey;

  (arguments.length > 1) ? peopleFilterArrey = people
    .filter(person => person.sex === 'f')
    .filter(women => people
      .some(person => person.mother === women
        .name)) : peopleFilterArrey = people
    .filter((person) => person.sex === 'f');

  const agePerson = peopleFilterArrey
    .map((person) => person.died - person.born);
  const averageAge = agePerson
    .reduce((a, b) => a + b, 0) / agePerson.length;

  return +averageAge.toFixed(2);
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
  let peopleFilterArrey;

  (arguments.length > 1) ? peopleFilterArrey = people
    .filter(person => people
      .some(mom => mom.name === person.mother) && (person.sex === 'm'))
    : peopleFilterArrey = people
      .filter((person) => people.some(women => women.name === person.mother));

  const agePerson = peopleFilterArrey
    .map(person => person.born - people
      .find(mother => mother.name === person.mother).born);
  const averageAge = agePerson
    .reduce((a, b) => a + b, 0) / agePerson.length;

  return +averageAge.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

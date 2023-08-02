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
  const males = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const totalAge = males.reduce((acc, person) =>
    acc + (person.died - person.born), 0);

  return males.length ? totalAge / males.length : 0;
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
    ? people.filter(person => person.sex === 'f'
    && people.some(mother => person.name === mother.mother))
    : people.filter(person => person.sex === 'f');

  const totalAge = women.reduce((acc, person) =>
    acc + (person.died - person.born), 0);

  return women.length ? totalAge / women.length : 0;
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
  const kids = onlyWithSon
    ? people.filter(persona => persona.sex === 'm'
    && people.some(mother => mother.name === persona.mother))
    : people.filter(persona => people.some(mother =>
      mother.name === persona.mother));

  const totalAgeDifference = kids.reduce((total, kid) => {
    const mother = people.find(persona => persona.name === kid.mother);
    const ageDifference = mother ? kid.born - mother.born : 0;

    return total + ageDifference;
  }, 0);

  return totalAgeDifference / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const mens = century
    ? people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const ages = mens.map(men => men.died - men.born);

  return ages.reduce((sum, lifeLength) => sum + lifeLength, 0) / ages.length;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = people.filter(person => person.sex === 'f');

  const mothers = women.filter(woman =>
    people.find(person => person.mother === woman.name)
  );

  const ageOfWomen = women.map(woman => woman.died - woman.born);
  const ageOfMothers = mothers.map(mother => mother.died - mother.born);

  return withChildren
    ? ageOfMothers.reduce(
      (sum, lifeLength) => sum + lifeLength, 0) / ageOfMothers.length
    : ageOfWomen.reduce(
      (sum, lifeLength) => sum + lifeLength, 0) / ageOfWomen.length;
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
  const ageDifferences = onlyWithSon
    ? people.map(person => {
      const motherOfPerson = person.sex === 'm'
        ? people.find(human => human.name === person.mother)
        : undefined;

      return motherOfPerson ? person.born - motherOfPerson.born : 0;
    })
    : people.map(person => {
      const motherOfPerson = people.find(human => human.name === person.mother);

      return motherOfPerson ? person.born - motherOfPerson.born : 0;
    });

  const clearAgeDifferences = ageDifferences.filter(age => age > 0);

  return clearAgeDifferences.reduce((sum, age) =>
    sum + age, 0) / clearAgeDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

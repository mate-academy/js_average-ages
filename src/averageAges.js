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
  const men = century === undefined
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);

  const sumOfAges = men
    .map(man => man.died - man.born)
    .reduce((sum, age) => sum + age);

  const averageAges = sumOfAges / men.length;

  return averageAges;
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
  const mothers = people.map(person => person.mother);

  const women = withChildren === undefined
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => mothers.includes(person.name));

  const sumOfAges = women
    .map(woman => woman.died - woman.born)
    .reduce((sum, age) => sum + age);

  const averageAges = sumOfAges / women.length;

  return averageAges;
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
  const hasMother = onlyWithSon === undefined
    ? people.filter(person => person.mother !== null)
    : people.filter(person => person.mother !== null && person.sex === 'm');

  const women = people.filter(person => person.sex === 'f');

  const agesDiff = hasMother
    .map((person) => {
      const mother = women.find(woman => woman.name === person.mother);

      const motherBorn = mother !== undefined
        ? mother.born
        : person.born;

      return person.born - motherBorn;
    })
    .filter(age => age > 0);

  const sumOfAgesDiff = agesDiff.reduce((sum, age) => sum + age);

  const averageAgesDiff = sumOfAgesDiff / agesDiff.length;

  return averageAgesDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const startYear = arguments.length < 2 ? 0 : (century - 1) * 100 + 1;
  const endYear = arguments.length < 2 ? Infinity : startYear + 99;

  const peopleFromGivenCentury = people
    .filter(({ died, sex }) => died > startYear
      && died < endYear && sex === 'm');

  const sumOfAges = peopleFromGivenCentury
    .reduce((a, b) => (a + (b.died - b.born)), 0);

  return sumOfAges / peopleFromGivenCentury.length;
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
  const filteredWomen = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const sumOfAges = filteredWomen
    .reduce((a, b) => (a + (b.died - b.born)), 0);

  return sumOfAges / filteredWomen.length;
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
  const filteredChildren = onlyWithSon
    ? people.filter(person => person.sex === 'm'
    && people.some(mother => (mother.name === person.mother)))
    : people.filter(person => people
      .some(mother => mother.name === person.mother));

  const sumOfAges = filteredChildren.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0);

  return sumOfAges / filteredChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

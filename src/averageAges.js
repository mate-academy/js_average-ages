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
  const men = people.filter(person => person.sex === 'm');
  const menInCentury = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;
  const menAges = menInCentury.map(person => person.died - person.born);
  const menAverageAge = menAges.reduce((a, b) => a + b) / menAges.length;

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
  const women = people.filter(person => person.sex === 'f');
  const mothers = withChildren
    ? women.filter(woman => people.some(child => child.mother === woman.name))
    : women;
  const womenAges = mothers.map(person => person.died - person.born);
  const womenAverageAge = womenAges.reduce((a, b) => a + b) / womenAges.length;

  return womenAverageAge;
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
    ? people.filter(child => child.sex === 'm')
    : people;
  const ageDiffs = children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return mother ? child.born - mother.born : null;
  }).filter(ageDiff => ageDiff);
  const averageAgeDiff = ageDiffs.reduce((a, b) => a + b) / ageDiffs.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

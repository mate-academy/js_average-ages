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
  const filteredPeople = century
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;

  const maleAges = filteredPeople
    .filter(person => person.sex === 'm')
    .map(person => person.died - person.born);

  if (maleAges.length === 0) {
    return 0;
  }

  const totalMaleAges = maleAges.reduce((total, age) => total + age, 0);

  return totalMaleAges / maleAges.length;
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
  const filteredPeople = withChildren
    ? people.filter(person =>
      people.some(p => p.mother === person.name || p.father === person.name)
    )
    : people;

  const womenAges = filteredPeople
    .filter(person => person.sex === 'f')
    .map(person => person.died - person.born);

  if (womenAges.length === 0) {
    return 0;
  }

  const totalWomenAges = womenAges.reduce((total, age) => total + age, 0);

  return totalWomenAges / womenAges.length;
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const ageDifferences = filteredPeople
    .map(person => {
      const mother = people.find(p => p.name === person.mother);

      return mother ? person.born - mother.born : 0;
    })
    .filter(ageDiff => ageDiff !== 0);

  if (ageDifferences.length === 0) {
    return 0;
  }

  const totalAgeDifferences
  = ageDifferences.reduce((total, ageDiff) => total + ageDiff, 0);

  return totalAgeDifferences / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const filteredPeople = people.filter(person => {
    const whatCentyry = Math.ceil(person.died / 100);

    return century
      ? person.sex === 'm'
      && whatCentyry === century
      : person.sex === 'm';
  });
  const averageAge = filteredPeople.reduce((acum, { born, died }) => {
    const age = died - born;

    return acum + age;
  }, 0) / filteredPeople.length;

  return averageAge;
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
  const filteredWomen = people.filter(women => {
    const isMother = people.some(person => women.name === person.mother);

    return withChildren
      ? women.sex === 'f'
      && isMother
      : women.sex === 'f';
  });
  const averageAge = filteredWomen.reduce((acum, { born, died }) => {
    const age = died - born;

    return acum + age;
  }, 0) / filteredWomen.length;

  return averageAge;
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
    ? people.filter(p => p.sex === 'm')
    : people;
  const mothers = filteredPeople
    .map(person => people.find(x => x.name === person.mother))
    .filter(mom => mom);
  const ageDiffs = filteredPeople.map(person => {
    const mother = mothers.find(mom => mom.name === person.mother);

    return mother ? person.born - mother.born : null;
  }).filter(x => x !== null);
  const sumAgeDiffs = ageDiffs.reduce((acc, curr) => acc + curr, 0);

  return sumAgeDiffs / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

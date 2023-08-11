'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const isMale = person => person.sex === 'm';

  const man = people.filter((person) =>
    isMale(person) && (!century
    || Math.ceil(person.died / 100) === century)
  );

  const totalMenAge = man.reduce((sum, person) =>
    sum + (person.died - person.born), 0
  );

  return man.length ? totalMenAge / man.length : 0;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person) =>
    person.sex === 'f' && (!withChildren
    || people.some((child) => child.mother === person.name))
  );

  const totalWomenAge = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0
  );

  return women.length ? totalWomenAge / women.length : 0;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const isMale = person => person.sex === 'm';

  const relevantPeople = onlyWithSon
    ? people.filter(person => isMale(person))
    : people;

  const ageDifferences = relevantPeople.map(person => {
    const mother = people.find(candidateMother =>
      candidateMother.name === person.mother
    );

    return mother
      ? person.born - mother.born
      : null;
  }).filter(ageDiff => ageDiff !== null);

  const totalAgeDifference = ageDifferences
    .reduce((sum, ageDiff) => sum + ageDiff, 0);

  return ageDifferences.length > 0
    ? totalAgeDifference / ageDifferences.length : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

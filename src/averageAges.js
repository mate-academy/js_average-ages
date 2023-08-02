'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const malePeople = people.filter(person => person.sex === 'm');
  const totalAge = malePeople.reduce((sum, person) =>
    sum + (person.died - person.born), 0);
  const averageAge = totalAge / malePeople.length;

  if (typeof century === 'number') {
    const filteredMalePeople = malePeople.filter(person =>
      Math.ceil(person.died / 100) === century);
    const totalFilteredAge = filteredMalePeople.reduce((sum, person) =>
      sum + (person.died - person.born), 0);
    const averageFilteredAge = totalFilteredAge / filteredMalePeople.length;

    return averageFilteredAge;
  }

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const femalePeople = people.filter(person =>
    person.sex === 'f' && (!withChildren || people.some(child =>
      child.mother === person.name))
  );

  const totalAge = femalePeople.reduce((sum, person) =>
    sum + (person.died - person.born), 0);
  const averageAge = totalAge / femalePeople.length;

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDifferences = [];

  for (const person of people) {
    const hasMother = person.mother !== undefined;

    if (hasMother) {
      const mother = people.find(m => m.name === person.mother);

      if (mother) {
        const meetsCondition = !onlyWithSon || person.sex === 'm';

        if (meetsCondition) {
          const ageDifference = Math.abs(mother.born - person.born);

          ageDifferences.push(ageDifference);
        }
      }
    }
  }

  const totalAgeDifference = ageDifferences.reduce((sum, difference) =>
    sum + difference, 0);
  const averageAgeDifference = totalAgeDifference / ageDifferences.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

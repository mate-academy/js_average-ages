'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filteredMen = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const totalAge = filteredMen.reduce((sum, person) =>
    sum + (person.died - person.born), 0);
  const averageAge = totalAge / filteredMen.length;

  return averageAge;
}

/**
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

  const totalAge = filteredWomen.reduce((sum, person) =>
    sum + (person.died - person.born), 0);
  const averageAge = totalAge / filteredWomen.length;

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const ageDiffs = people.reduce((acc, person) => {
    if (person.mother !== null && (!onlyWithSon || person.sex === 'm')) {
      const mother = people.find(m => m.name === person.mother);

      if (mother) {
        const ageDiff = person.born - mother.born;

        acc.push(ageDiff);
      }
    }

    return acc;
  }, []);

  const averageAgeDiff = ageDiffs.reduce((sum, ageDiff) =>
    sum + ageDiff, 0) / ageDiffs.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

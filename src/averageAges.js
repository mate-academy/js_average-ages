'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateAverageAge(men) {
  return men.reduce(
    (sum, person) => sum + person.died - person.born, 0) / men.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(
    person => person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century)
  );

  return calculateAverageAge(men);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const hasChildren = person => {
    return people.some(p => p.mother === person.name);
  };
  const womenWithChildren = withChildren ? women.filter(hasChildren) : women;

  return calculateAverageAge(womenWithChildren);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDiffs = people.filter(person =>
    (!onlyWithSon || person.sex === 'm')
    && person.mother !== null
    && people.some(p => p.name === person.mother)
  )
    .map(
      person => person.born - people.find(p => p.name === person.mother).born
    );

  const sumAgeDiffs = ageDiffs.reduce((acc, curr) => acc + curr, 0);

  return sumAgeDiffs / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

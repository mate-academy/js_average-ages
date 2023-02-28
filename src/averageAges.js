'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  return getAverageAge(men);
}

/* @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    withChildren ? person.sex === 'f'
    && people.some(child => child.mother === person.name)
      : person.sex === 'f');

  return getAverageAge(women);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people.filter(person => people.find(
      mother => person.mother === mother.name
    ) && person.sex === 'm')

    : people.filter(person => people.find(
      mother => person.mother === mother.name
    ));

  const ageDifference = children.map(
    child => child.born - people.find(mother =>
      child.mother === mother.name).born
  );

  const averegeAgeDifference = ageDifference.reduce((acc, person) =>
    acc + person) / ageDifference.length;

  return averegeAgeDifference;
}

function getAverageAge(people) {
  return people.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

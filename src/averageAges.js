'use strict';

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menCalculated = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const menAge = menCalculated.map(man => man.died - man.born);

  return getAverageValue(menAge);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenCalculated = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.find(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const womenAge = womenCalculated.map(woman => woman.died - woman.born);

  return getAverageValue(womenAge);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenCalculated = onlyWithSon
    ? people.filter(person => person.mother
      && person.sex === 'm' && people.find(mom => mom.name === person.mother))
    : people.filter(person => person.mother
      && people.find(mom => mom.name === person.mother));

  const ageDifference = childrenCalculated
    .map(person => {
      const mother = people.find(mom => mom.name === person.mother);
      const diff = person.born - mother.born;

      return diff;
    });

  return getAverageValue(ageDifference);
}

function getAverageValue(people) {
  return people.reduce((sum, element) => sum + element) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

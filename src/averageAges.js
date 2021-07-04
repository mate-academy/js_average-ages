'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century ? (person.sex === 'm' && century)
  === Math.ceil(person.died / 100) : person.sex === 'm');

  return men.map(man => man.died - man.born)
    .reduce((a, b) => a + b) / men.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren ? person.sex === 'f'
  && people.some(child => child.mother === person.name) : person.sex === 'f');

  return women.map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b) / women.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => onlyWithSon
    ? people.find(child => child.name === person.mother) && person.sex === 'm'
    : people.find(child => child.name === person.mother));

  return children.map(child => child.born - people.find(women => women.name
    === child.mother).born)
    .reduce((a, b) => a + b) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

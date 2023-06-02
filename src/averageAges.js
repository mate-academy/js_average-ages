'use strict';

/**
 * Implement calculateMenAverageAge function

 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm'
  && (century ? (Math.ceil(person.died / 100) === century) : true));

  const menAge = men.map(person => person.died - person.born);

  return menAge.reduce((sum, person) => sum + person, 0) / menAge.length;
}

/**
 * Implement calculateWomenAverageAge function

 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => (withChildren
    ? (people.find(child => child.mother === person.name))
    : person.sex === 'f'));

  const womenAge = women.map(person => person.died - person.born);

  return womenAge.reduce((sum, person) => sum + person, 0) / womenAge.length;
}

/**
 * Implement calculateAverageAgeDiff function.

 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => people
    .find(mother => mother.name === person.mother)
  && (onlyWithSon ? person.sex === 'm' : true));

  const ageDiff = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return ageDiff.reduce((sum, person) => sum + person, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

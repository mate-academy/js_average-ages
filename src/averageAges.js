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
  const deadMen = century
    ? people.filter((person) => (
      Math.ceil(person.died / 100) === century && person.sex === 'm'
    )).map(man => (
      man.died - man.born
    )) : people
      .filter(person => person.sex === 'm')
      .map(man => man.died - man.born);

  return deadMen.reduce((a, b) => a + b) / deadMen.length;
}
/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const womenWithChild = withChildren
    ? people.filter(mother =>
      people.some(child => (
        child.mother === mother.name
      ))) : people
      .filter(women => (women.sex === 'f'));

  return ((womenWithChild
    .map(women => (
      women.died - women.born)))
    .reduce((a, b) => (
      a + b)))
    / womenWithChild.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let result = [];

  people.filter(function(mother) {
    const children = onlyWithSon
      ? people.filter(child => (
        child.sex === 'm' && child.mother === mother.name
      )) : people
        .filter(child => child.mother === mother.name);

    if (children) {
      result.push(children
        .map(child => child.born - mother.born));
    }

    result = result.flat();
  });

  return result.reduce((a, b) => a + b) / result.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

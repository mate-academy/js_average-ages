'use strict';

/*
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century = 0) {
  const men = century ? people.filter(person =>
    Math.ceil(person.died / 100) === century && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const sumAge = men.reduce((sum, person) =>
    sum + person.died - person.born, 0);

  return sumAge / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = 0) {
  const women = withChildren ? people.filter(person =>
    people.some(child => child.mother === person.name) && person.sex === 'f')
    : people.filter(person => person.sex === 'f');

  const averegeAgeWomen = women.reduce((sum, person) =>
    person.died - person.born + sum, 0);

  return averegeAgeWomen / women.length;
}

/*
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon = 0) {
  const children = people.filter(person => !onlyWithSon
    ? people.find(mother => person.mother === mother.name)
    : people.find(mother => person.mother === mother.name && person.sex === 'm')
  );

  const ageDiff = children.map(person => person.born
    - people.find(mother => person.mother === mother.name).born);

  const sumAgeDiff = ageDiff.reduce((sum, x) => sum + x, 0);

  return sumAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

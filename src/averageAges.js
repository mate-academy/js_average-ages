'use strict';

// const people = require('./people');

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
  let men = people.filter(person => person.sex === 'm');

  const menInCentury = men.filter(man => Math.ceil(man.died / 100) === century);

  men = century ? menInCentury : men;

  const menLifeTime = men.map(man => man.died - man.born);

  const averageMenLife = menLifeTime.reduce((life1, life2) =>
    life1 + life2) / men.length;

  return averageMenLife;
}
// calculateMenAverageAge(people);

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');

  const allMothers = people.map(person => person.mother);

  const womenWithChild = withChildren
    ? women.filter(mother => allMothers.includes(mother.name))
    : women;

  const lifeTime = womenWithChild.map(woman => woman.died - woman.born);

  const averageWomanLife = (lifeTime.reduce((life1, life2) =>
    life1 + life2)) / womenWithChild.length;

  return averageWomanLife;
}
// calculateWomenAverageAge(people);

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = people.filter(child =>
    people.find(mother => mother.name === child.mother));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const totalLife = children
    .reduce((prev, child) => (prev + child.born - people
      .find(woman => (woman.name === child.mother)).born), 0);

  const averageAge = totalLife / children.length;

  return averageAge;
}

// calculateAverageAgeDiff(people);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

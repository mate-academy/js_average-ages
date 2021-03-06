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
  const men = century === undefined
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => Math.ceil(person.died / 100) === century
        && person.sex === 'm');

  const ages = men.map(man => man.died - man.born);

  return Math.ceil(ages.reduce((a, b) => a + b) / ages.length * 1000) / 1000;
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
function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(person => person.sex === 'f' && isMother(person))
    : people.filter(person => person.sex === 'f');

  function isMother(woman) {
    return people.find(person => person.mother === woman.name);
  }

  const ages = women.map(woman => woman.died - woman.born);

  return Math.ceil(ages.reduce((a, b) => a + b) / ages.length * 1000) / 1000;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age diference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age diference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const diferences = onlyWithSon
    ? people.filter(person => person.sex === 'm' && hasMother(person))
      .map(person => person.born - findMotherOfChild(person).born)
    : people.filter(person => hasMother(person))
      .map(person => person.born - findMotherOfChild(person).born);

  function hasMother(child) {
    const mother = people.find(person => child.mother === person.name);

    return mother !== undefined;
  }

  function findMotherOfChild(child) {
    return people.find(person => child.mother === person.name);
  }

  return Math.ceil(diferences.reduce(
    (a, b) => a + b) / diferences.length * 1000) / 1000;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

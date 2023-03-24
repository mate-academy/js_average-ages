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
  let man = people.filter(person => person.sex === 'm');

  man = century
    ? man.filter(person => Math.ceil(person.died / 100) === century)
    : man;

  const sumAges = man.reduce(
    (sum, person) => sum + (person.died - person.born), 0);
  const avgAges = sumAges / man.length;

  return avgAges;
}
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
  let woman = withChildren
    ? people
      .filter(person => person.mother !== null)
      .map(person => person.mother)
    : people.filter(person => person.sex === 'f');

  woman = withChildren
    ? people.filter(item => woman.includes(item.name))
    : woman;

  const sumAges = woman.reduce(
    (sum, person) => sum + (person.died - person.born), 0);
  const avgAges = sumAges / woman.length;

  return avgAges;
}

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
  const findMom = onlyWithSon
    ? people
      .filter(person => people.some(mother => mother.name === person.mother)
       && person.sex === 'm')
    : people
      .filter(person => people.some(mother => mother.name === person.mother));

  const sumAges = (findMom.reduce((sum, woman) => {
    const mother = people.find(mom => mom.name === woman.mother);
    const difference = woman.born - mother.born;

    return sum + difference;
  }, 0));

  const avgAges = sumAges / findMom.length;

  return avgAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

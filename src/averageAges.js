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
  const mans = people.filter(person => person.sex === 'm');

  const mansWhoDiedInThisCentury = mans.filter(man =>
    century ? Math.ceil(man.died / 100) === century : mans);

  const ages = mansWhoDiedInThisCentury.map(deadman =>
    deadman.died - deadman.born);

  const sumOfAges = ages.reduce((start, x) => start + x);

  return sumOfAges / ages.length;
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
  const women = people.filter(person => person.sex === 'f');

  const womenWithChild = women.filter(woman =>
    withChildren ? people.some(person => person.mother === woman.name) : women);

  const ages = womenWithChild.map(deadwoman => deadwoman.died - deadwoman.born);

  const sumOfAges = ages.reduce((start, x) => start + x);

  return sumOfAges / ages.length;
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
  const women = people.filter(person => person.sex === 'f');
  const mans = people.filter(person => person.sex === 'm');

  const womenWithChild = women.filter(woman =>
    onlyWithSon ? mans.some(man =>
      man.mother === woman.name) : people.some(person =>
      person.mother === woman.name));

  const children = people.filter(person =>
    womenWithChild.some(woman => person.mother === woman.name));
  const sons = children.filter(child =>
    onlyWithSon ? child.sex === 'm' : child);

  const ageDifference = sons.map(child =>
    child.born - womenWithChild.find(mother =>
      child.mother === mother.name).born);

  const sumOfAges = ageDifference.reduce((start, x) => start + x);

  return sumOfAges / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

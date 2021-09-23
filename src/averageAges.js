'use strict';

function averageAge(people) {
  return people.reduce((prev, curr) =>
    prev + (curr.died - curr.born), 0) / people.length;
};

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
  const mens = people.filter(person => person.sex === 'm');

  return century
    ? averageAge(mens.filter(men => Math.ceil(men.died / 100) === century))
    : averageAge(mens);
};

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
  const womens = people.filter(person => person.sex === 'f');
  const moms = people.filter(person =>
    people.some(child => child.mother === person.name));

  return withChildren
    ? averageAge(moms)
    : averageAge(womens);
};

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const moms = people.filter(person =>
    people.some(child => child.mother === person.name));

  let children = people.filter(person =>
    moms.find(mom => mom.name === person.mother));

  if (onlyWithSon) {
    children = children.filter(person => person.sex === 'm');
  }

  const ageDiff = children.map(child =>
    child.born - moms.find(mother =>
      mother.name === child.mother).born);

  return ageDiff.reduce((prev, curr) => prev + curr) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

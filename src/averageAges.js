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
  const men = people.filter(person => person.sex === 'm');

  const menToCount = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  return calculateAverageAge(menToCount);
}

function calculateAverageAge(people) {
  return people.reduce((prev, curr) => {
    return prev + (curr.died - curr.born);
  }, 0) / people.length;
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
  const womenToCount = withChildren
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;

  return calculateAverageAge(womenToCount);
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
  const children = people
    .filter(child => findMother(people, child))
    .map(child => ({ ...child, mother: findMother(people, child) }));

  const childrenToCount = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  return childrenToCount.reduce((prev, curr) => {
    return prev + (curr.born - curr.mother.born);
  }, 0) / childrenToCount.length;
}

function findMother(people, child) {
  return people.find(person => person.name === child.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

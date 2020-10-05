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
  const men = century
    ? people.filter(
      person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century
    )
    : people.filter(person => person.sex === 'm');

  return men.reduce(
    (accumulatedAge, man) => accumulatedAge + (man.died - man.born), 0
  ) / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(
      person => person.sex === 'f'
      && people.find(individual => individual.mother === person.name)
    )
    : people.filter(person => person.sex === 'f');

  return women.reduce(
    (accumulatedAge, woman) => accumulatedAge + (woman.died - woman.born), 0
  ) / women.length;
}

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
  const children = onlyWithSon
    ? people.filter(person => findMother(people, person) && person.sex === 'm')
    : people.filter(person => findMother(people, person));

  return children.reduce(
    (accumulatedAge, child) => accumulatedAge
    + (child.born - findMother(people, child).born), 0
  ) / children.length;
}

function findMother(people, child) {
  return people.find(person => child.mother === person.name);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

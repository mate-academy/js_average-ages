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
  const men = people.filter(person => person.sex === 'm'
    && (century === undefined
      ? true : Math.ceil(person.died / 100) === century));

  const ages = men.map(person => person.died - person.born);

  const averageAge = ages.reduce((sum, person) =>
    sum + person, 0) / ages.length;

  return averageAge;
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
  const women = people.filter((person, i, arr) => person.sex === 'f'
    && (withChildren
      ? arr.some(someone => someone.mother === person.name) : true));

  const ages = women.map(person => person.died - person.born);

  const averageAge = ages.reduce((sum, person) =>
    sum + person, 0) / ages.length;

  return averageAge;
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
  const children = people.filter((person) => onlyWithSon
    ? people.some((mother) => person.mother === mother.name
    && person.sex === 'm')
    : people.some((mother) => person.mother === mother.name));
  const average = children.reduce((accum, child) => {
    const mother = people.find((person) => person.name === child.mother);

    return accum + (child.born - mother.born);
  }, 0) / children.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

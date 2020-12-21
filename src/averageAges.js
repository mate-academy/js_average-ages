'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of woman's death by 100: Math.ceil(woman.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menOfCentury = people.filter(
    (man) => century ? Math.ceil(man.died / 100) === century
    && man.sex === 'm' : man.sex === 'm');

  function countSum(sum, man) {
    const age = man.died - man.born;

    return sum + age;
  }

  const summ = menOfCentury.reduce(countSum, 0);

  return summ / menOfCentury.length;
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
  const womenWithChildren = people.filter(
    (woman) => withChildren ? woman.sex === 'f'
    && people.some((person) => person.mother === woman.name)
      : woman.sex === 'f');

  function countSum(sum, woman) {
    const age = woman.died - woman.born;

    return sum + age;
  }

  const summ = womenWithChildren.reduce(countSum, 0);

  return summ / womenWithChildren.length;
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
  const children = people.filter(person => onlyWithSon
    ? people.some((child) => child.name === person.mother)
    && person.sex === 'm'
    : people.some((child) => child.name === person.mother));

  const sum = children.reduce(countSum, 0);

  function countSum(prev, child) {
    const mother = people.find((mom) => mom.name === child.mother);

    const diff = child.born - mother.born;

    return prev + diff;
  }

  return sum / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

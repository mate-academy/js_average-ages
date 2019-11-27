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
  const men = arguments.length > 1
    ? people.filter(person => Math.ceil(person.died / 100) === century
        && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  return men
    .reduce((acc, person) => acc + (person.died - person.born), 0) / men.length;
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
  const women = people.filter(person => person.sex === 'f');

  const womenWithChildren = women.filter(woman => people
    .some(person => person.mother === woman.name));

  if (arguments.length === 1) {
    return women.map(person => person.died - person.born)
      .reduce((sum, person) => sum + person) / women.length;
  } else {
    // как здесь numbers приняло значение из функции? wtf?
    return womenWithChildren.map(woman => woman.died - woman.born)
      .reduce((sum, numbers) => sum + numbers) / womenWithChildren.length;
  }
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  return getAverage(
    people
      .filter(person => !onlyWithSon || person.sex === 'm')
      .map(child => [child, getMother(people, child)])
      .filter(([, mother]) => mother)
      .map(([child, mother]) => child.born - mother.born)
  );
}

function getAverage(numbers) {
  const sum = numbers.reduce((a, b) => a + b);

  return sum / numbers.length;
}

function getMother(people, child) {
  return people.find(mother => mother.name === child.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

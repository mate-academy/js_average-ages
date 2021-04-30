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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let menOnly = people.filter(({
    sex,
  }) => sex === 'm');

  if (century) {
    menOnly = menOnly.filter(({
      died,
    }) => (Math.ceil(died / 100) === century));
  }

  const menAgesSum = menOnly.reduce(
    (
      sum,
      man,
    ) => sum + (man.died - man.born), 0);
  const menAverageAge = menAgesSum / menOnly.length;

  return menAverageAge;
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
  // write code here
  let womenOnly = people.filter(({
    sex,
  }) => sex === 'f');

  if (withChildren) {
    womenOnly = womenOnly.filter(
      woman => people.find(person => woman.name === person.mother));
  }

  const womenAgesSum = womenOnly.reduce(
    (
      sum,
      woman,
    ) => sum + (woman.died - woman.born), 0);
  const womenAverageAge = womenAgesSum / womenOnly.length;

  return womenAverageAge;
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
  // write code here
  const womenOnly = people.filter(({
    sex,
  }) => sex === 'f');
  const mothers = womenOnly.filter(
    woman => people.find(person => woman.name === person.mother)
  );
  let children = people.filter(
    person => mothers.find(mother => person.mother === mother.name)
  );

  if (onlyWithSon) {
    children = children.filter(({
      sex,
    }) => sex === 'm');
  }

  const ageDiff = children.reduce(
    (
      sum,
      child
    ) => child.born - mothers.find(
      mother => child.mother === mother.name).born + sum, 0
  );

  const average = ageDiff / children.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

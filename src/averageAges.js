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

  const menArray = (century) ? people.filter((person) => (person.sex === 'm')
    && (Math.ceil(person.died / 100) === century))
    : people.filter(person => (person.sex === 'm'));
  const menAges = menArray.map(person => person.died - person.born);
  const result = menAges.reduce((prev, current) => prev + current, 0)
    / menAges.length;

  return result;
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
  const womenArray = (withChildren) ? people.filter((woman, index, array) =>
    array.find(person => (woman.name === person.mother)))
    : people.filter(person => (person.sex === 'f'));

  const womenAges = womenArray.map(person => person.died - person.born);

  const result = womenAges.reduce((prev, current) => prev + current, 0)
    / womenAges.length;

  return result;
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
  let ageDif = 0;

  const childrenArray = (onlyWithSon)
    ? (people.filter((kid, index, array) =>
      array.find(mom =>
        (kid.mother === mom.name && kid.sex === 'm')
          ? ((ageDif += kid.born - mom.born), true) : false)))
    : people.filter((kid, index, array) =>
      array.find(mom => ((kid.mother === mom.name)
        ? ((ageDif += kid.born - mom.born), true) : false)));

  return ageDif / childrenArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

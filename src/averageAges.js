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

  function compareCentury(el) {
    return Math.ceil(el.died / 100);
  }

  const peopleDate = people
    .filter(el => el.sex === 'm')
    .filter(el => !century || compareCentury(el) === century);

  return peopleDate.reduce((acumulator, current) => {
    return acumulator + (current.died - current.born);
  }, 0) / peopleDate.length;
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

  function hasChildren(mother) {
    return people.some(el => el.mother === mother.name);
  }

  const peopleDate = people
    .filter(el => el.sex === 'f')
    .filter(el => !withChildren || hasChildren(el));

  return peopleDate.reduce((acumulator, current) => {
    return acumulator + (current.died - current.born);
  }, 0) / peopleDate.length;
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
  function diffAge(person) {
    const mum = people.find(el => el.name === person.mother);

    if (mum) {
      return person.born - mum.born;
    }
  }

  const peopleDate = people
    .filter(el => !onlyWithSon || el.sex === 'm')
    .filter(el => diffAge(el))
    .map(el => diffAge(el));

  return peopleDate.reduce((acumulator, current) => {
    return acumulator + current;
  }, 0) / peopleDate.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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

  const man = people.filter((obj) =>
    century
      ? Math.ceil(obj.died / 100) === century && obj.sex === `m`
      : obj.sex === `m`
  );

  const ages = man.map((obj) => obj.died - obj.born);

  return getAverage(ages);
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

function getAverage(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const woman = people.filter((women) =>
    withChildren
      ? people.some((child) => child.mother === women.name)
      : women.sex === `f`
  );

  const ages = woman.map((obj) => obj.died - obj.born);

  return getAverage(ages);
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
  const mothers = people.filter((obj) =>
    people.some((elem) => elem.mother === obj.name)
  );
  const children = people.filter((obj) =>
    onlyWithSon
      ? mothers.some((mom) => mom.name === obj.mother && obj.sex === `m`)
      : mothers.some((mom) => mom.name === obj.mother)
  );
  const ages = children.map(
    (obj) => obj.born - mothers.find((mom) => mom.name === obj.mother).born
  );

  return getAverage(ages);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

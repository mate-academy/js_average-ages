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
  const tillYear = arguments.length > 1 ? century : 0;

  const result = people.reduce(function(arr, pers) {
    const isWomen = pers.sex === 'm';

    const isReady = tillYear && isWomen;

    const isDiedtillYear = Math.ceil(pers.died / 100) === tillYear;

    return isReady
      ? isDiedtillYear
        ? [...arr, pers.died - pers.born] : arr : isWomen
        ? [...arr, pers.died - pers.born] : arr;
  }, []);

  return result.reduce((sum, item) => sum + item, 0) / result.length;
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
function calculateWomenAverageAge(people, withChildren = 0) {
  // write code here
  const result = people.reduce(function(arr, pers) {
    const isBoy = pers.sex === 'f';

    const isWithBoyChildren = isBoy && withChildren;

    const isHaveChildren = people.filter((x) => x.mother === pers.name).length;

    return isWithBoyChildren
      ? isHaveChildren
        ? [...arr, pers.died - pers.born] : arr : isBoy
        ? [...arr, pers.died - pers.born] : arr;
  }, []);

  return result.reduce((sum, x) => sum + x, 0) / result.length;
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
  // write code here
  const womensWithChild = people.filter((mother) => mother.sex === 'f'
  && people.some((child) => child.mother === mother.name
  && (onlyWithSon ? child.sex === 'm' : true))
  );

  const childWithMom = people.filter(function(child) {
    return people.some((mother) => mother.name === child.mother)
    && (onlyWithSon ? child.sex === 'm' : true);
  });

  const result = childWithMom.reduce(function(sum, child) {
    return sum + (child.born - womensWithChild.find((mother) =>
      mother.name === child.mother
    ).born);
  }, 0) / childWithMom.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

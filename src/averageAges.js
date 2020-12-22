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
  let result;

  century === undefined
    ? result = people.filter(man => man.sex === 'm')
    : result = people.filter(man =>
      man.sex === 'm' && (Math.ceil(man.died / 100) === century)
    );

  return result
    .reduce((sum, boy) => sum + (boy.died - boy.born), 0)
    / result.length;
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
  let result;

  (!withChildren)
    ? result = people.filter(woman => woman.sex === 'f')
    : result = people.filter(woman =>
      people.some(child => child.mother === woman.name)
    );

  return result
    .reduce((sum, { died, born }) => sum + (died - born), 0)
    / result.length;
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
  const arrChild = people.filter(child =>
    onlyWithSon
      ? people.some(mam => child.mother === mam.name && child.sex === 'm')
      : people.some(mam => child.mother === mam.name)
  );

  return arrChild
    .map(child =>
      child.born - people.find(mam => child.mother === mam.name).born)
    .reduce((sum, age) => sum + age) / arrChild.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const menArr = people.filter(person => person.sex === 'm');
  let resultMen;

  century
    ? resultMen = menArr.filter(man => Math.ceil(man.died / 100) === century)
    : resultMen = menArr;

  const sumYear = resultMen
    .reduce((sum, man) => sum + (man.died - man.born), 0);

  return sumYear / resultMen.length;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  let resultArr;
  const allWomen = people.filter(person => person.sex === 'f');

  withChildren
    ? resultArr = allWomen
      .filter(mother => people
        .some(person => person.mother === mother.name))
    : resultArr = allWomen;

  return resultArr
    .map(person => person.died - person.born)
    .reduce((sum, ages) => sum + ages) / resultArr.length;
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
  const children = people.filter(child => onlyWithSon
    ? people.some(mother => mother.name === child.mother) && child.sex === 'm'
    : people.some(mother => mother.name === child.mother));

  const ageDifferences = children
    .map(child => child.born - people
      .find(mother => child.mother === mother.name).born);

  return ageDifferences
    .reduce((acc, current) => acc + current) / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

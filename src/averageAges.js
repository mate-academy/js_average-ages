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

function countAverageAge(numsArr) {
  const age = numsArr.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0
  );

  return age / numsArr.length;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const man = people
    .filter(value => century
      ? value.sex === 'm' && Math.ceil(value.died / 100) === century
      : value.sex === 'm'
    )
    .map(value => value.died - value.born);

  return countAverageAge(man);
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
  const women = people
    .filter(
      value => withChildren
        ? value.sex === 'f' && people.some(el => el.mother === value.name)
        : value.sex === 'f'
    )
    .map(value => value.died - value.born);

  return countAverageAge(women);
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  const withMoter = people.filter(
    el => onlyWithSon
      ? people.some(val => val.name === el.mother) && el.sex === 'm'
      : people.some(val => val.name === el.mother)
  );

  const childBorn = withMoter
    .reduce((accumulator, currentValue) => accumulator + currentValue.born, 0);
  const motherBorn = withMoter
    .map(el => people.find(val => val.name === el.mother))
    .reduce((accumulator, currentValue) => accumulator + currentValue.born, 0);

  return (childBorn - motherBorn) / withMoter.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

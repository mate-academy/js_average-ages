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
function calculateMenAverageAge(people, century = 0) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const peoples = (century === 0)
    ? people.filter(x => x.sex === 'm')
    : people.filter(x => (Math.ceil(x.died / 100) === century
      && x.sex === 'm'));

  const res = peoples.map(x => x.died - x.born);

  return (res.reduce((a, b) => a + b, 0)) / res.length;
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
  let mothers;
  const mothersNames = people.map(x => x.mother);

  withChildren
    ? mothers = people.filter(x => mothersNames.includes(x.name))
    : mothers = people.filter(x => x.sex === 'f');

  mothers = mothers.map(x => x.died - x.born);

  return mothers.reduce((a, b) => a + b, 0) / mothers.length;
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
  const mothersNames = people.map(x => x.mother);
  const mothers = people.filter(x => mothersNames.includes(x.name));
  const peoples = people.filter(child =>
    mothers.find(mother => onlyWithSon
      ? child.mother === mother.name && child.sex === 'm'
      : child.mother === mother.name
    ));

  return peoples
    .map(child => child.born - mothers
      .find(mother => mother.name === child.mother).born)
    .reduce((sum, age) => sum + age, 0) / peoples.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

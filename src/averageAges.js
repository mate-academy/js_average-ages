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
  // replace `if ()` statement with logical operators (&&, ||) or ternary operator (?:)
  // without nesting
  const men = typeof(century) === 'number'
    ? people.filter(human => human.sex === 'm')
      .filter(man => Math.ceil(man.died / 100) === century)
    : people.filter(human => human.sex === 'm');

  return men.map(man => man.died - man.born)
    .reduce((accum, age) => accum + age) / men.length;
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
  const women = people.filter(human => human.sex === 'f');
  const mothers = women.filter(woman => people.some(human => human.mother === woman.name));

  return withChildren
    ? mothers.map(woman => woman.died - woman.born)
      .reduce((accum, age) => accum + age) / mothers.length
    : women.map(woman => woman.died - woman.born)
      .reduce((accum, age) => accum + age) / women.length;
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
  const mothers = people.filter(human => human.sex === 'f')
    .filter(woman => people.some(human => human.mother === woman.name));
  const men = people.filter(human => human.sex === 'm');

  function calcAgesDiff(childs, moms) {
    return childs.map((child) => {
      const mother = moms.find((mom) => mom.name === child.mother);
      return mother ? (child.born - mother.born) : 0;
    }).filter(diff => diff > 0);
  }

  const ageDiffArr = onlyWithSon
    ? calcAgesDiff(men, mothers)
    : calcAgesDiff(people, mothers);

  return ageDiffArr.reduce((accum, diff) => accum + diff) / ageDiffArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

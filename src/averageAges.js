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
  const mans = people.filter(x => x.sex === 'm');
  const centMans = mans.filter(x => Math.ceil(x.died / 100) === century);

  return century === undefined
    ? mans.reduce((sum, x) => sum + (x.died - x.born), 0)
    / mans.length

    : centMans.reduce((sum, x) => sum + (x.died - x.born), 0)
    / centMans.length;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const womens = people.filter(x => x.sex === 'f');
  const mothers = people.filter(x => {
    return people.some(y => y.mother === x.name);
  });

  return withChildren === undefined
    ? womens.reduce((sum, x) => sum + (x.died - x.born), 0)
    / womens.length

    : mothers.reduce((sum, x) => sum + (x.died - x.born), 0)
    / mothers.length;
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
  const chields = people.filter(x => {
    return people.some(y => y.name === x.mother);
  });

  const chieldsMans = people.filter(x => {
    return people.some(y => y.name === x.mother) && (x.sex === 'm');
  });

  // 1. Find childs (depending on onlyWithSon)
  // 2. Find needed ages
  // 3. Calculate avergae age

  const childAct = onlyWithSon === undefined
    ? chields
    : chieldsMans;

  const age = childAct.map(x => {
    const motherOfChield = people.find(y => x.mother === y.name);

    return x.born - motherOfChield.born;
  });

  return (age.reduce((sum, x) => sum + x, 0) / age.length);

  // chield.born - mothers.born
  //  age. / mothers.lendth
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

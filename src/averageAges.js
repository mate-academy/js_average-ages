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
  const mans = century
    ? people.filter(man => man.sex === 'm'
      && Math.ceil(man.died / 100) === century)
    : people.filter(man => man.sex === 'm');

  return mans.reduce((sum, age) => sum + (age.died - age.born), 0)
    / mans.length;

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
  const womens = withChildren
    ? people.filter(mother => {
      return people.some(child => child.mother === mother.name);
    })
    : people.filter(women => women.sex === 'f');

  return womens.reduce((sum, age) => sum + (age.died - age.born), 0)
    / womens.length;
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
  const chields = !onlyWithSon
    ? people.filter(child => people
      .some(mother => mother.name === child.mother))
    : people.filter(child => people
      .some(mother => mother.name === child.mother)
      && (child.sex === 'm'));

  const age = chields.map(child => {
    const motherOfChield = people.find(mother => child.mother === mother.name);

    return child.born - motherOfChield.born;
  });

  return (age.reduce((sum, x) => sum + x, 0) / age.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

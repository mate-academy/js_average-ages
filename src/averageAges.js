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
  const onlyMan = people.filter(person => person.sex === 'm');
  const men = century
    ? onlyMan.filter(
      person => Math.ceil(person.died / 100) === century)
    : onlyMan;

  const result = men.reduce((sum, x) => sum + (x.died - x.born), 0);

  return result / men.length;
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
  // write code here
  const onlyWomen = people.filter(person => person.sex === 'f');
  const women = withChildren
    ? onlyWomen.filter(
      person => people.some(child => child.mother === person.name))
    : onlyWomen;

  const result = women.reduce((sum, x) => sum + (x.died - x.born), 0);

  return result / women.length;
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
  const kids = onlyWithSon
    ? people.filter(
      child => child.sex === 'm' && people.some(
        mom => child.mother === mom.name))
    : people.filter(
      child => people.some(
        mom => child.mother === mom.name));

  return kids.reduce((acc, child) => {
    const mother = people.find(mom => child.mother === mom.name);

    return acc + child.born - mother.born;
  }, 0) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

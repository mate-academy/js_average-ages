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
  const men = people.filter(({ died, sex }) => century
    ? sex === 'm' && Math.ceil(died / 100) === century
    : sex === 'm');

  const averAge = men.reduce((calc, man) =>
    (calc + (man.died - man.born)), 0) / men.length;

  return averAge;

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
  const women = people.filter(({ name, sex }) => withChildren
    ? sex === 'f' && people.find(kid => kid.mother === name)
    : sex === 'f');

  const averAge = women.reduce((calc, woman) =>
    (calc + (woman.died - woman.born)), 0) / women.length;

  return averAge;
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
  const mothers = people.filter(({ name, sex }) => onlyWithSon
    ? sex === 'f' && people.find(son => son.sex === 'm' && son.mother === name)
    : sex === 'f' && people.find(kid => kid.mother === name));

  const kids = people.filter(({ sex, mother }) => onlyWithSon
    ? sex === 'm' && mothers.some(m => m.name === mother)
    : mothers.some(m => m.name === mother));

  const averAge = kids.reduce((calc, child) =>
    (calc + (child.born - mothers.find(m => m.name === child.mother).born)), 0)
    / kids.length;

  return averAge;
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

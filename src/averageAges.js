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

  const men = people.filter(person => (person.sex === 'm')
  && (century ? Math.ceil(person.died / 100) === century : true));

  const plusAllAges = (prev, current) => prev + (current.died - current.born);
  const ageSumm = men.reduce(plusAllAges, 0);

  return ageSumm / men.length;
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
  const women = people.filter(({ sex, name }) => ((sex === 'f')
  && (withChildren ? people.some(({ mother }) => mother === name) : true)));

  const plusAllAges = (prev, current) => prev + (current.died - current.born);
  const ageSumm = women.reduce(plusAllAges, 0);

  return ageSumm / women.length;
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
  const childsWithMother = people.filter(({ mother, sex }) =>
    (people.find(({ name }) => name === mother) && (onlyWithSon
      ? sex === 'm' : true)));

  const ageDiffs = childsWithMother.map(({ born, mother }) =>
    born - people.find(({ name }) => name === mother).born);

  return ageDiffs.reduce((prev, current) =>
    prev + current, 0) / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

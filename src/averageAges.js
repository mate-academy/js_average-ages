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

function calculataAvarageAge(filteredArray) {
  let result = 0;
  const allAges = filteredArray.map(({ born, died }) => died - born);
  const sum = allAges.reduce((a, b) => a + b);

  result = sum / allAges.length;

  return result;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const onlyMan = (arguments.length > 1)
    ? people.filter((
      { sex, died }) => (sex === 'm' && Math.ceil(died / 100) === century))
    : people.filter(({ sex }) => sex === 'm');

  return calculataAvarageAge(onlyMan);
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
  const onlyWoman = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(({ mother }) => mother === person.name)
    : person.sex === 'f'
  );

  return calculataAvarageAge(onlyWoman);
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
  const onlyKidMom = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.some(mother => mother.name === person.mother)
    : people.some(mother => mother.name === person.mother)
  );

  const diffKidMom = onlyKidMom.map(child => child.born
      - people.find(mother => mother.name === child.mother).born);

  return diffKidMom.reduce((a, b) => a + b) / diffKidMom.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 * learn how to use array methods like .filter .map .some .every .find .reduce
 * avoid using loop and forEach
 * replace `if ()` statement with &&, || or ?:
 * without nesting
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menList = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const menAges = menList.map(person => person.died - person.born);

  const menAverageAge = menAges.reduce((sum, currentAge) =>
    sum + currentAge) / menAges.length;

  return menAverageAge;
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
  const womenList = people.filter(person => withChildren
    ? people.find(child => person.name === child.mother)
    : person.sex === 'f');

  const womenAges = womenList.map(person => person.died - person.born);
  const womenAverageAge = womenAges.reduce((sum, currentAge) =>
    sum + currentAge) / womenAges.length;

  return womenAverageAge;
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
  const children = people.filter(child => onlyWithSon
    ? people.find(mother => mother.name === child.mother) && child.sex === 'm'
    : people.find(mother => mother.name === child.mother));

  const diffs = children.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  const AverageDiff = diffs.reduce((sum, currentDiff) =>
    sum + currentDiff) / diffs.length;

  return AverageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

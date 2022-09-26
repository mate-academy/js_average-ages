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
function calculateAverageAge(people) {
  const onlyAges = people.map((person) => person.died - person.born);

  return onlyAges.reduce((sum, diff) => sum + diff, 0) / onlyAges.length;
}

function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter(person => person.sex === 'm');
  const men = century
    ? onlyMen.filter(person => Math.ceil(person.died / 100) === century)
    : onlyMen;

  return calculateAverageAge(men);
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
  const onlyMother = people.filter(mother => withChildren
    ? mother.sex === 'f'
    && people.some(person => mother.name === person.mother)
    : mother.sex === 'f');

  return calculateAverageAge(onlyMother);
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
  let children = people.filter(child =>
    (people.find(mother => child.mother === mother.name)));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDifference = children.reduce((sum, child) => {
    return sum + child.born - people.find(mother =>
      child.mother === mother.name).born;
  }, 0) / children.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

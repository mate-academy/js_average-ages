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
  const onlyMen = people.filter(person => person.sex === 'm');
  const men = century
    ? onlyMen.filter(person => Math.ceil(person.died / 100) === century)
    : onlyMen;
  const averageAge = men.reduce((sum, i) => sum + (i.died - i.born), 0);

  return averageAge / men.length;
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
  const findMother = withChildren
    ? people.filter(mother => mother.sex === 'f'
    && people.some(person => mother.name === person.mother))
    : people.filter(mother => mother.sex === 'f');
  const averageAge = findMother.reduce((sum, i) => sum + (i.died - i.born), 0);

  return averageAge / findMother.length;
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
  const findChildren = onlyWithSon
    ? people.filter(child =>
      (people.find(mother => child.mother === mother.name)
      && child.sex === 'm'))
    : people.filter(child =>
      people.find(mother => child.mother === mother.name));
  const ageDifference = findChildren.reduce((sum, child) => {
    return sum + child.born - people.find(mother =>
      child.mother === mother.name).born;
  }, 0) / findChildren.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men = people.filter(person => person.sex === 'm');
  const filteredMen = (century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men);
  const averageMenAges = filteredMen.reduce((sum, man) => (
    (sum + (man.died - man.born))), 0) / filteredMen.length;

  return averageMenAges;
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
  const women = (withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f'));
  const averageWomenAges = women.reduce((sum, woman) => (
    (sum + (woman.died - woman.born))), 0) / women.length;

  return averageWomenAges;
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
  const onlySons = onlyWithSon;
  const children = (onlySons
    ? people.filter(child => (
      people.some(person => child.mother === person.name) && child.sex === 'm'))
    : people.filter(child => (
      people.some(person => child.mother === person.name))));

  const mothers = people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name));

  const agesDifference = children.reduce((sum, child) => {
    const ageDifference = child.born
    - mothers[mothers.findIndex(mother => mother.name === child.mother)].born;

    return sum + ageDifference;
  }, 0);

  return agesDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

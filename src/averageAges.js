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

  const menCentury = men.filter(person => century !== undefined
    ? Math.ceil(person.died / 100) === century
    : true);

  const peopleAges = menCentury.map(person => person.died - person.born);

  return getAverage(peopleAges);
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

  const woman = people.filter(person => withChildren ? (
    person.sex === 'f' && people.some(child => child.mother === person.name)
  )
    : person.sex === 'f');

  const peopleAges = woman.map(person => person.died - person.born);

  return getAverage(peopleAges);
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

  const children = onlyWithSon
    ? people.filter(child => child.sex === 'm' && people.some(person =>
      child.mother === person.name))
    : people.filter(child => people.some(person =>
      person.name === child.mother));

  const childrenMother = people.filter(mother => people.some(person =>
    person.mother === mother.name));

  const peopleAges = children.map(child =>
    child.born - childrenMother.find(mother =>
      mother.name === child.mother).born);

  return getAverage(peopleAges);
}

function getAverage(peopleAges) {
  return peopleAges.reduce((sum, index) => sum + index) / peopleAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const diedInСertainСentury = (person) => (
    !century || century === Math.ceil(person.died / 100)
  );
  const men = people.filter(
    person => person.sex === 'm' && diedInСertainСentury(person)
  );

  return getAgesSum(men) / men.length;
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
  const haveChild = (children, woman) => (
    children.find(child => child.mother === woman.name)
  );
  const women = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => person.sex === 'f' && haveChild(people, person));

  return getAgesSum(women) / women.length;
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
  const haveMother = (humans, child) => (
    humans.find(mother => mother.name === child.mother)
  );
  const children = !onlyWithSon
    ? people.filter(child => haveMother(people, child))
    : people.filter(child => haveMother(people, child) && child.sex === 'm');
  const averageAgeDiff = children.reduce((sumOfAges, child) => (
    sumOfAges
    + child.born
    - people.find(mother => mother.name === child.mother).born
  ), 0) / children.length;

  return averageAgeDiff;
}

function getAgesSum(peopleGroup) {
  return peopleGroup.reduce(
    (sum, person) => sum + person.died - person.born,
    0
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

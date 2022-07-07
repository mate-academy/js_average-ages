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
  const man = century ? people.filter(
    (arg) => arg.sex === 'm' && Math.ceil(arg.died / 100) === century)
    : people.filter((item) => item.sex === 'm');

  const count = man.reduce((a, b) => a + (b.died - b.born), 0);

  return count / man.length;
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
  const womenOne = people.filter((item) => item.sex === 'f');
  const womenWithChaild = womenOne.filter(
    (item) => people.some((arr) => arr.mother === item.name));
  const women = withChildren ? womenWithChaild : womenOne;
  const count = women.reduce((a, b) => a + (b.died - b.born), 0);

  return count / women.length;
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
  const childrenWithMotherInTheList = people
    .filter(person => people
      .some(mother => mother.name === person.mother));

  const averageAgeDifference = (children) => {
    if (children.length === 0) {
      return 0;
    }

    return children.reduce((sum, child) =>
      sum + child.born - people.find(personsMother =>
        child.mother === personsMother.name).born, 0) / children.length;
  };

  return onlyWithSon
    ? averageAgeDifference(childrenWithMotherInTheList
      .filter(child => child.sex === 'm'))
    : averageAgeDifference(childrenWithMotherInTheList);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

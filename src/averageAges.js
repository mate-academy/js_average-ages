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
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
const averageAge = (people) => {
  if (people.length === 0) {
    return 0;
  }

  return people.reduce((sum, person) => sum + person.died - person.born, 0)
  / people.length;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  return century
    ? averageAge(men.filter(person => Math.ceil(person.died / 100) === century))
    : averageAge(men);
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
  const women = people.filter(person => person.sex === 'f');

  return withChildren
    ? averageAge(women
      .filter(person => people
        .some(children => children.mother === person.name)))
    : averageAge(women);
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

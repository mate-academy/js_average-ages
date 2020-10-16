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
// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter((person) => {
      const findCentury = Math.ceil(person.died / 100);

      return findCentury === century && person.sex === 'm';
    })
    : people.filter((person) => person.sex === 'm');

  const averageAge = men.reduce((age, man) => {
    const ageOfMan = man.died - man.born;

    return age + ageOfMan;
  }, 0);

  return averageAge / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = (withChildren)
    ? people
      .filter(person => person.sex === 'f')
      .filter(woman => people.some(child => child.mother === woman.name))

    : people.filter(person => person.sex === 'f');

  const averageAge = women.reduce((age, woman) => {
    const ageOfWoman = woman.died - woman.born;

    return age + ageOfWoman;
  }, 0);

  return averageAge / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people
      .filter((person) => person.sex === 'm')
      .filter((child) => people.some((mother) => mother.name === child.mother))

    : people.filter((child) =>
      people.some((mother) => mother.name === child.mother));

  const ageDifference = children.map((child) =>
    child.born - people.find((mother) => child.mother === mother.name).born
  );

  const averageAgeDifference = ageDifference.reduce((prevAge, nextAge) => {
    return prevAge + nextAge / ageDifference.length;
  }, 0);

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

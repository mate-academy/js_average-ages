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

  const men = (arguments.length < 2)
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => Math.ceil(person.died / 100) === century
      && person.sex === 'm');

  const menAverageAge = men
    .map(person => person.died - person.born)
    .reduce(
      (accumulator, current) => accumulator + current, 0
    ) / men.length;

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
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = findWomenWithChildren(people);

  const womenAverageAge = (!withChildren)
    ? women
      .map(person => person.died - person.born)
      .reduce(
        (accumulator, current) => accumulator + current, 0
      ) / women.length
    : womenWithChildren
      .map(person => person.died - person.born)
      .reduce(
        (accumulator, current) => accumulator + current, 0
      ) / womenWithChildren.length;

  return womenAverageAge;
}

function findWomenWithChildren(people) {
  return people.filter(person => (
    people.find(child => person.name === child.mother) && person.sex === 'f'
  ));
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
  const ageDifference = people
    .map(child => {
      const motherIndex = (onlyWithSon)
        ? people.findIndex(person => person.name === child.mother
          && child.sex === 'm')
        : people.findIndex(person => person.name === child.mother);
      const mother = people[motherIndex];

      if (mother && child.born) {
        return child.born - mother.born;
      }
    })
    .filter(age => age);

  const averageAgeDifference = ageDifference.reduce(
    (accumulator, current) => accumulator + current, 0
  ) / ageDifference.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

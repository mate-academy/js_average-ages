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
  let men = people.filter(person => person.sex === 'm');

  men = (century)
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  return calculateAverageAge(calculateAges(men));
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
  let women = people.filter(person => person.sex === 'f');

  women = (withChildren)
    ? women.filter(person => (
      people.find(child => person.name === child.mother)
    ))
    : women;

  return calculateAverageAge(calculateAges(women));
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
      let mother = people.find(person => person.name === child.mother);
      const motherWithSon = (child.sex === 'm') ? mother : undefined;

      mother = onlyWithSon ? motherWithSon : mother;

      return (mother && child.born)
        ? child.born - mother.born
        : undefined;
    })
    .filter(age => age);

  return calculateAverageAge(ageDifference);
}

function calculateAges(array) {
  return array.map(person => person.died - person.born);
}

function calculateAverageAge(array) {
  return array.reduce(
    (accumulator, current) => accumulator + current, 0
  ) / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

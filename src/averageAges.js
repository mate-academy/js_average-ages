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

function calculateAge(array) {
  return array.reduce((acc, person) => {
    const age = person.died - person.born;

    return acc + age;
  }, 0) / array.length;
}

function calculateMenAverageAge(people, century) {
  const diedMen = century
    ? people.filter(person => century === Math.ceil(person.died / 100)
    && person.sex === 'm' && person.died)
    : people.filter(person => person.sex === 'm' && person.died);

  return calculateAge(diedMen);
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
  const womenWithChildren = women.filter(woman => {
    return people.some(person => person.mother === woman.name);
  });

  return withChildren
    ? calculateAge(womenWithChildren)
    : calculateAge(women);
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const children = people.filter(child => {
    return onlyWithSon
      ? people.find(woman => child.sex === 'm'
      && child.mother === woman.name)
      : people.find(woman => child.mother === woman.name);
  });

  return children.reduce((acc, child) => {
    const womanAge = people.find(woman => {
      return child.mother === woman.name;
    }).born;

    return acc + child.born - womanAge;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men = people.filter((person) => {
    return person.sex === 'm'
      && (century
        ? Math.ceil(person.died / 100) === century
        : true);
  });

  const menAverageAge = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return menAverageAge / men.length;
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
  const women = people.filter((person) =>
    person.sex === 'f'
      && (withChildren
        ? people.some(child => child.mother === person.name)
        : true));

  const womenAverageAge = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return womenAverageAge / women.length;
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
  const children = people.filter((child) =>
    people.some(person => person.name === child.mother)
      && (onlyWithSon
        ? child.sex === 'm'
        : true
      ));

  const ageDifference = children.reduce((sum, child) => {
    const mum = people.find(person => person.name === child.mother);
    const mothersAge = child.born - mum.born;

    return sum + mothersAge;
  }, 0);

  return ageDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

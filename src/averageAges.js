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
  const filteredMen = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  return filteredMen.reduce((age, person) => {
    return age + (person.died - person.born);
  }, 0) / filteredMen.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter(person => withChildren
    ? people.find(child => child.mother === person.name)
    : person.sex === 'f');

  return filteredWomen.reduce((age, person) => {
    return age + (person.died - person.born);
  }, 0) / filteredWomen.length;
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
  const children = people.filter(person => onlyWithSon
    ? people.find(mum => mum.name === person.mother)
      && person.sex === 'm'
    : people.find(mum => mum.name === person.mother));

  const ageDifference = children.map(
    age => age.born - people.find(mom => mom.name === age.mother).born
  );

  return ageDifference.reduce(
    (count, person) => count + person) / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
function calculateTotalAge(people) {
  return people.reduce((sum, pers) => sum + (pers.died - pers.born), 0);
}

function calculateMenAverageAge(people, century) {
  const peopleFilter = people.filter(person => century ? person.sex === 'm'
  && Math.ceil(person.died / 100) === century : person.sex === 'm');

  const totalAge = calculateTotalAge(peopleFilter);

  return totalAge / peopleFilter.length;
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
  const womenFilter = people.filter(person => withChildren
    ? people.find(mother => person.name === mother.mother)
    : person.sex === 'f');

  const totalAge = calculateTotalAge(womenFilter);

  return totalAge / womenFilter.length;
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
  const peopleFilter = people.filter(person => onlyWithSon
    ? people.some(mother => mother.name === person.mother && person.sex === 'm')
    : people.find(mother => mother.name === person.mother));

  const ageDifference = peopleFilter.map(person => person.born
    - people.find(mother => mother.name === person.mother).born);

  const calcDifference = ageDifference.reduce((prev, age) => prev + age
  / ageDifference.length, 0);

  return calcDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

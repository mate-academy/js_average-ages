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
function calculateMenAverageAge(people, century = null) {
  const allMenAge = people
    .filter(person => century
      ? (Math.ceil(person.died / 100) === century)
      && person.sex === 'm'
      : person.sex === 'm')
    .map(person => person.died - person.born);

  return Math.round(allMenAge.reduce((acc, age) => acc + age)
  / allMenAge.length * 100) / 100;
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
  const allWomenAge = people
    .filter(person => withChildren
      ? people.find(women => person.name === women.mother)
      && person.sex === 'f' : person.sex === 'f')
    .map(person => person.died - person.born);

  return Math.round(allWomenAge.reduce((acc, age) => acc + age)
  / allWomenAge.length * 100) / 100;
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
  const allWomenAge = people
    .filter(person => onlyWithSon
      ? people.some(women => women.name === person.mother)
      && person.sex === 'm'
      : people.some(women => women.name === person.mother))
    .map(child => child.born - people.find(mother =>
      mother.name === child.mother).born);

  return Math.round(allWomenAge.reduce((acc, age) => acc + age)
  / allWomenAge.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

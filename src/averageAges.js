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
  const menInArray = century
    ? people.filter(person => Math.ceil(person.died / 100)
    === century && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const menAge = menInArray.map(man => man.died - man.born);

  const averageAge = menAge.reduce((prev, current) => prev + current)
  / menAge.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const allWomen = withChildren
    ? people.filter(person => people.some(child =>
      child.mother === person.name) && person.sex === 'f')
    : people.filter(person => person.sex === 'f');

  const womenAge = allWomen.map(women => women.died - women.born);

  const averageAge = womenAge.reduce((prev, current) => prev + current)
  / womenAge.length;

  return averageAge;
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
  const checkCondition = onlyWithSon
    ? people.filter(person => person.sex === 'm' && people.some(mother =>
      person.mother === mother.name))
    : people.filter(child => people.some(person =>
      person.name === child.mother));

  const ageDifference = checkCondition.map(child => child.born
      - people.find(person => child.mother === person.name).born);

  return ageDifference.reduce((sum, age) => sum + age)
  / checkCondition.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

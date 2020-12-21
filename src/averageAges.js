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
  const allMen = people.filter((person) => century
    ? person.sex === 'm'
      && (century === Math.ceil(person.died / 100))
    : person.sex === 'm');

  const menAge = allMen.map(person => person.died - person.born);

  const averageAge = menAge.reduce((sum, age) => sum + age, 0) / menAge.length;

  return averageAge;
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
  const allWomen = people.filter((person) => person.sex === 'f');

  const selectedWomen = withChildren
    ? allWomen.filter(woman =>
      people.some(person => person.mother === woman.name))
    : allWomen;

  const womenAge = selectedWomen.map(person => person.died - person.born);

  const averageAge = womenAge.reduce((sum, age) => sum + age, 0);

  return averageAge / womenAge.length;
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
  const children = people.filter(child => onlyWithSon
    ? people.some(woman => woman.name === child.mother)
      && child.sex === 'm'
    : people.some(woman => woman.name === child.mother));

  const childBirthAge = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  const averageAge = childBirthAge.reduce((sum, age) => sum + age, 0);

  return averageAge / childBirthAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

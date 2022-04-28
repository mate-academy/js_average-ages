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
  const filterMen = people.filter((person) => person.sex === 'm');

  const menAge = century
    ? filterMen.filter((person) =>
      century === Math.ceil(person.died / 100)).map((person) =>
      person.died - person.born)
    : filterMen.map((person) => person.died - person.born);

  const avMenAge = menAge.reduce((sum, age) => sum + age) / menAge.length;

  const result = Number(avMenAge.toFixed(2));

  return result;
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
  const filterWomen = people.filter((person) => withChildren
    ? people.find(child => child.mother === person.name)
    : person.sex === 'f');

  const womenAge = filterWomen.map((person) => person.died - person.born);

  const avWomenAge = womenAge.reduce((sum, age) => sum + age) / womenAge.length;

  const result = Number(avWomenAge.toFixed(2));

  return result;
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
  const women = people.filter((person) => person.sex === 'f'
    && people.some((child) => child.mother === person.name));

  const children = people.filter((person) => onlyWithSon
    ? person.sex === 'm' && people.some((mother) =>
      person.mother === mother.name)
    : people.some((mother) => person.mother === mother.name));

  const age = children.map((child) =>
    child.born - women.find((mother) => mother.name === child.mother).born);

  return age.reduce((a, b) => a + b) / age.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

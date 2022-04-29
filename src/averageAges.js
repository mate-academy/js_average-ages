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
  const men = people.filter(person => person.sex === 'm');

  const menAge = century
    ? men.filter(person => century === Math.ceil(person.died / 100))
      .map(person => person.died - person.born)
    : men.map(person => person.died - person.born);

  const averageAge = menAge.reduce((sum, age) => sum + age, 0) / menAge.length;

  return Number(averageAge.toFixed(2));
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
  const FilteredWomen = people.filter(person =>
    withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f');

  const womenAge = FilteredWomen.map(person => person.died - person.born);

  const averageAge = womenAge.reduce((sum, age) => sum + age, 0)
    / womenAge.length;

  return Number(averageAge.toFixed(2));
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
  const mothers = people.filter(person =>
    onlyWithSon
      ? people.find(child => child.mother === person.name && child.sex === 'm')
      : people.find(child => child.mother === person.name));

  const children = people.filter(person =>
    onlyWithSon
      ? people.find(mother =>
        person.mother === mother.name && person.sex === 'm')
      : people.find(mother => person.mother === mother.name));

  const ages = children.map(child =>
    child.born - mothers.find(parent => parent.name === child.mother).born);

  const averageAges = ages.reduce((sum, age) => sum + age, 0) / ages.length;

  return Number(averageAges.toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

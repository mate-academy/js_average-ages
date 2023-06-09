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
  const menList = century
    ? people
      .filter(man => man.sex === 'm')
      .filter(man => Math.ceil(man.died / 100) === century)
    : people.filter(man => man.sex === 'm');

  const totalMenAge = menList.reduce((age, man) =>
    age + (man.died - man.born), 0);

  return totalMenAge / menList.length;
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
  const womanList = withChildren
    ? people
      .filter(woman => woman.sex === 'f')
      .filter(woman => people.find(child => child.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');

  const totalWomenAge = womanList.reduce((age, woman) =>
    age + (woman.died - woman.born), 0);

  return totalWomenAge / womanList.length;
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
  const childList = onlyWithSon
    ? people
      .filter(child => child.sex === 'm')
      .filter(child => people.find(mother => mother.name === child.mother))
    : people
      .filter(child => people.find(mother => mother.name === child.mother));

  const diffAge = childList.reduce((age, child) =>
    age + (child.born - people
      .find(mother => mother.name === child.mother).born), 0);

  return diffAge / childList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

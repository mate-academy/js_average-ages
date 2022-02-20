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
  // write code here
  const menFilter = century
    ? man => man.sex === 'm' && Math.ceil(man.died / 100) === century
    : man => man.sex === 'm';

  const men = people.filter(menFilter);
  const menTotalAge = men.reduce((sum, man) => sum + (man.died - man.born), 0);

  return menTotalAge / men.length;
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
  // write code here
  const womenFilter = withChildren
    ? mother => people.find(man => man.mother === mother.name)
    : person => person.sex === 'f';

  const women = people.filter(womenFilter);
  const womenAge = women.reduce((sum, man) => sum + (man.died - man.born), 0);

  return womenAge / women.length;
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
  // write code here
  const motherFilter = onlyWithSon
    ? mother =>
      people.find(man => man.mother === mother.name && man.sex === 'm')
    : mother => people.find(man => man.mother === mother.name);

  const mothers = people.filter(motherFilter);
  const childFilter = onlyWithSon
    ? child =>
      people.find(mother => child.mother === mother.name && child.sex === 'm')
    : child => people.find(mother => child.mother === mother.name);

  const childs = people.filter(childFilter);
  const ageDiff = childs.map(man => man.born
     - (mothers.find(mother => man.mother === mother.name)).born);

  const averageDiff = ageDiff.reduce((sum, age) => sum + age) / ageDiff.length;

  return averageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

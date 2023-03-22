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
  const men = people.filter(man => man.sex === 'm');
  const diedMen = men.filter(person =>
    Math.ceil(person.died / 100) === century);

  const averageAllMenAge = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / men.length;
  const averageDiedMenAge = diedMen.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / diedMen.length;

  return century ? averageDiedMenAge : averageAllMenAge;
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
  const women = people.filter(woman => woman.sex === 'f');
  const mothers = people.filter(person =>
    people.some(mom => (person.name === mom.mother && person.sex === 'f')));

  const averageWomenAge = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / women.length;
  const averageMothersAge = mothers.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / mothers.length;

  return withChildren ? averageMothersAge : averageWomenAge;
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
    people.some(mom => (person.name === mom.mother && person.sex === 'f')));
  const children = people.filter(person =>
    mothers.some(mom => (person.mother === mom.name)));
  const onlySon = children.filter(son => son.sex === 'm');

  const allAge = children.map(child =>
    child.born - mothers.find(mom => child.mother === mom.name).born);
  const sonsAge = onlySon.map(child =>
    child.born - mothers.find(mom => child.mother === mom.name).born);

  const averageAllAge = allAge.reduce((sum, age) => sum + age, 0)
    / allAge.length;
  const averageSonsAge = sonsAge.reduce((sum, age) => sum + age, 0)
    / sonsAge.length;

  return onlyWithSon ? averageSonsAge : averageAllAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

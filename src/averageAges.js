'use strict';

const getAverageValue = (ages, amount) => (
  ages.reduce((sum, age) => sum + age, 0) / amount
);

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
  const men = people.filter(man => (
    century
      ? man.sex === 'm' && Math.ceil(man.died / 100) === century
      : man.sex === 'm'
  ));
  const menAges = men.map(man => man.died - man.born);
  const averageMenAge = getAverageValue(menAges, men.length);

  return averageMenAge;
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
  const women = people.filter(woman => (
    withChildren
      ? people.find(child => woman.name === child.mother)
      : woman.sex === 'f'
  ));
  const womenAges = women.map(woman => woman.died - woman.born);
  const averageWomenAge = getAverageValue(womenAges, women.length);

  return averageWomenAge;
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
  const children = people.filter(child => (
    onlyWithSon
      ? people.find(mother => mother.name === child.mother)
      && child.sex === 'm'
      : people.find(mother => mother.name === child.mother)
  ));
  const ageDiff = children.map(
    child => child.born - people.find(
      mother => mother.name === child.mother
    ).born
  );
  const averageAgeDiff = getAverageValue(ageDiff, children.length);

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

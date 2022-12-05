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
const getAverage = (ages, amount) => (
  ages.reduce((sum, age) => sum + age, 0) / amount
);

function calculateMenAverageAge(people, century) {
  const men = people.filter(man => (
    century
      ? man.sex === 'm' && Math.ceil(man.died / 100) === century
      : man.sex === 'm'
  ));

  const menAges = men.map(man => man.died - man.born);
  const averageMenAge = getAverage(menAges, men.length);

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
  const averageWomenAge = getAverage(womenAges, women.length);

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
  const children = people.filter(kid => (
    onlyWithSon
      ? people.find(mother => mother.name === kid.mother)
        && kid.sex === 'm'
      : people.find(mother => mother.name === kid.mother)
  ));

  const ageDifferences = children.map(
    kid => kid.born - people.find(mother => mother.name === kid.mother).born
  );
  const averageAgeDifference = getAverage(ageDifferences, children.length);

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

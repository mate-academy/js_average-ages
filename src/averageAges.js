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
  const men = people.filter(person => (
    century === undefined
      ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century));
  const menAges = men.map(person => person.died - person.born);
  const totalMenAge = menAges.reduce((sum, age) => sum + age, 0);
  const averageMenAge = totalMenAge / men.length;

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
  const women = people.filter(person => (
    withChildren
      ? people.find(child => person.name === child.mother)
      : person.sex === 'f'
  ));
  const womenAges = women.map(person => person.died - person.born);
  const totalWomenAge = womenAges.reduce((sum, age) => sum + age, 0);
  const averageWomenAge = totalWomenAge / women.length;

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
  const kids = people.filter(person => (
    onlyWithSon
      ? people.find(mother => mother.name === person.mother)
        && person.sex === 'm'
      : people.find(mother => mother.name === person.mother)
  ));
  const ageDifferences = kids.map(
    kid => kid.born - people.find(mother => mother.name === kid.mother).born
  );
  const totalAgeDifference = ageDifferences.reduce((sum, age) => sum + age, 0);
  const averageAgeDifference = totalAgeDifference / kids.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

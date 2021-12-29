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
  const men = people.filter(person => person.sex === 'm'
    && ((!century)
    || (Math.ceil(person.died / 100) === century)));

  const menAges = men.map(person => person.died - person.born);
  const sumAges = menAges.reduce((a, b) => a + b, 0);

  return sumAges / menAges.length;
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
  const women = people.filter(person => person.sex === 'f'
    && ((!withChildren)
    || (people.some(child => child.mother === person.name))));

  const allWomenAge = women.map(person => person.died - person.born);
  const sumAllWomenAge = allWomenAge.reduce((a, b) => a + b, 0);

  return sumAllWomenAge / allWomenAge.length;
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
  const hasMother = people.filter(person =>
    people.some(one => one.name === person.mother)
    && ((!onlyWithSon) || person.sex === 'm'));

  const diffAges = hasMother.map(person =>
    person.born - people.find(one => one.name === person.mother).born);
  const sumDiff = diffAges.reduce((a, b) => a + b, 0);

  return sumDiff / diffAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

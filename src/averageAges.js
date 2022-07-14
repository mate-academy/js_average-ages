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
  const filteredMen = people.filter(({ sex, died }) => (
    (sex === 'm') && (century
      ? Math.ceil(died / 100) === (century)
      : true)
  ));

  const menAges = filteredMen.map(({ born, died }) => died - born);

  const averageMenAge = menAges.reduce((acc, age) => {
    return acc + (age / menAges.length);
  }, 0);

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
  const filteredWomen = (withChildren)
    ? people.filter(({ name }) => (
      people.some(({ mother }) => name === mother)
    ))
    : people.filter(({ sex }) => sex === 'f');

  const womenAges = filteredWomen.map(({ born, died }) => died - born);

  const averageWomenAge = womenAges.reduce((acc, age) => {
    return acc + (age / womenAges.length);
  }, 0);

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
  const childrenWithMom = (onlyWithSon)
    ? people.filter(({ sex, mother }) => (
      (sex === 'm')
      && (people.find(({ name }) => name === mother))
    ))
    : people.filter(({ mother }) => (
      people.find(({ name }) => name === mother)
    ));

  const ageDifference = childrenWithMom
    .reduce((acc, child) => (
      acc
      + (child.born
      - people.find(({ name }) => name === child.mother).born)
      / childrenWithMom.length)
    , 0);

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

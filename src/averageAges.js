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
  const men = people.filter(({ sex, died }) => century
    ? Math.ceil(died / 100) === century && sex === 'm'
    : sex === 'm'
  );

  const averageMenAge = men.reduce((totalAge, man) => (
    totalAge + (
      (man.died - man.born) / men.length
    )
  ), 0);

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
  const filteredWomen = people.filter(({ sex, name }) => (
    withChildren
      ? people.some(({ mother }) => name === mother)
      : sex === 'f'
  ));

  const averageWomenAge = filteredWomen.reduce((totalAge, woman) => (
    totalAge + (
      (woman.died - woman.born) / filteredWomen.length)
  ), 0);

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
  const childrenWithMom = people.filter(({ mother, sex }) => onlyWithSon
    ? people.some(({ name }) => name === mother) && sex === 'm'
    : people.some(({ name }) => name === mother)
  );

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

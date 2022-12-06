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
  const man = century
    ? people.filter((person) =>
      Math.ceil(person.died / 100) === century && person.sex === 'm')
    : people.filter((person) => person.sex === 'm');

  const manAge = man.map((person) => person.died - person.born);
  const averageAge = calculateAverageAge(manAge);

  return averageAge;
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
  const women = withChildren
    ? people.filter((woman) => {
      return people.find((child) => woman.name === child.mother);
    })
    : people.filter((person) => person.sex === 'f');

  // return people.filter(item => person.find(item.mother) === person);

  const womenAge = women.map((person) => person.died - person.born);
  const averageAge = calculateAverageAge(womenAge);

  return averageAge;
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
  const womenWithChildren = onlyWithSon
    ? people.filter((child) => {
      return (
        people.find((woman) => woman.name === child.mother) && child.sex === 'm'
      );
    })
    : people.filter((child) => {
      return people.find((woman) => woman.name === child.mother);
    });

  const ageDifferences = womenWithChildren.map((child) => {
    return (
      child.born - people.find((woman) => woman.name === child.mother).born
    );
  });

  const averageAgeDifference = calculateAverageAge(ageDifferences);

  return averageAgeDifference;
}

function calculateAverageAge(array) {
  return array.reduce(
    (acc, year) => acc + year) / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

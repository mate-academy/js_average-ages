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
  const men = people.filter((person) => person.sex === 'm');

  const menInCentury = century
    ? men.filter((person) => Math.ceil(person.died / 100) === century)
    : men;

  const sumOfAge = menInCentury.reduce((sum, person) =>
    sum + person.died - person.born, 0);

  return sumOfAge / menInCentury.length;
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
  const women = people.filter((person) => person.sex === 'f');
  const womenWithChildren = withChildren
    ? women.filter((person) => people.some((p) => p.mother === person.name))
    : women;

  return +(womenWithChildren.reduce((sum, person) =>
    sum + person.died - person.born, 0) / womenWithChildren.length).toFixed(2);
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
function calculateAverageAgeDiff(people, sonsOnly) {
  const childrenWithMothers = people.filter((child) => {
    const hasMother = people.some((person) => person.name === child.mother);

    return sonsOnly ? child.sex === 'm' && hasMother : hasMother;
  });

  const ageDifferences = childrenWithMothers.map((child) =>
    child.born - people.find((person) => person.name === child.mother).born);

  return +(ageDifferences.reduce((sum, diff) =>
    sum + diff, 0) / ageDifferences.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

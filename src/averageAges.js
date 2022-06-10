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
  const men = people.filter((person) => {
    return century
      ? person.sex === 'm' && (Math.ceil(person.died / 100) === century)
      : person.sex === 'm';
  });

  const menAgeSum = men.reduce((sum, person) => {
    const personAge = person.died - person.born;

    return sum + personAge;
  }, 0);

  return menAgeSum / men.length;
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
  const women = people.filter((person) => {
    return withChildren
      ? person.sex === 'f'
      && people.some((child) => child.mother === person.name)
      : person.sex === 'f';
  });

  const womenAgeSum = women.reduce((sum, person) => {
    const personAge = person.died - person.born;

    return sum + personAge;
  }, 0);

  return womenAgeSum / women.length;
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
  let childCount = 0;
  const mothers = people.filter((person) => {
    return person.sex === 'f'
      && people.some((child) => child.mother === person.name);
  });

  const children = onlyWithSon
    ? people.filter((person) => person.sex === 'm')
    : people;

  const ageDiffSum = children.reduce((sum, child) => {
    const mother = mothers.find((person) => person.name === child.mother);

    childCount += mother ? 1 : 0;

    return mother
      ? sum + (child.born - mother.born)
      : sum;
  }, 0);

  return ageDiffSum / childCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

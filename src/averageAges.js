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
  const men = people.filter(person => {
    if (century) {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    }

    return person.sex === 'm';
  });

  const ages = men.reduce((sum, age) => sum + (age.died - age.born), 0);
  const agesMiddle = ages / men.length;

  return (agesMiddle);
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
  const women = people.filter(person => {
    if (withChildren) {
      const child = people.filter(mothers =>
        person.name === mothers.mother);

      return person.sex === 'f' && child.length;
    }

    return person.sex === 'f';
  });

  const ages = women.reduce((sum, age) => sum + (age.died - age.born), 0);
  const agesMiddle = ages / women.length;

  return (agesMiddle);
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
  let children = people.filter(
    person => people.find(mother => mother.name === person.mother));

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  const difference = children.map(
    child => child.born - people.find(
      mother => mother.name === child.mother).born);
  const averageDifference = difference.reduce(
    (a, b) => a + b) / difference.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men = people.filter(({ sex, died }) => {
    return century
      ? sex === 'm' && Math.ceil(died / 100) === century
      : sex === 'm';
  });

  return culculateSumAges(men) / men.length;
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
  const women = people.filter(({ sex, name }) => {
    return withChildren
      ? sex === 'f' && people.some(person => person.mother === name)
      : sex === 'f';
  });

  return culculateSumAges(women) / women.length;
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
  const hasMother = people.filter(child => {
    const mother = people.find(person => person.name === child.mother);

    return mother && (onlyWithSon ? child.sex === 'm' : true);
  });

  const ageDifference = hasMother.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const sumAgeDifference = ageDifference.reduce((a, b) => a + b, 0);

  const averageAgeDifference = sumAgeDifference / ageDifference.length;

  return averageAgeDifference;
}

function culculateSumAges(people) {
  return people.reduce((a, b) => a + (b.died - b.born), 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

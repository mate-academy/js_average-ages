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

function calculateAverageAge(people) {
  if (people.length === 0) {
    return 0;
  }

  const ages = people.map(person => person.died - person.born);
  const sum = ages.reduce((a, b) => a + b, 0);

  return sum / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => (!century
    || Math.ceil(person.died / 100) === century)
    && person.sex === 'm');

  return calculateAverageAge(men);
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
    const female = person.sex === 'f';
    const hasChildren = people.some(child => child.mother === person.name);

    if (withChildren) {
      return female && hasChildren;
    }

    return female;
  });

  if (women.length === 0) {
    return 0;
  }

  return calculateAverageAge(women);
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

  const ageDiff = hasMother.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const sum = ageDiff.reduce((a, b) => a + b, 0);

  const average = sum / ageDiff.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
function getAverage(arrWithAge) {
  const average = arrWithAge.reduce((accum, curr) => {
    return accum + curr;
  }, 0) / arrWithAge.length;

  return average;
}

function calculateMenAverageAge(people, century) {
  const menAge = people.filter((person) => {
    const centuryOfDeath = Math.ceil(person.died / 100);

    return person.sex === 'm' && (century ? centuryOfDeath === century : true);
  }).map(person => person.died - person.born);

  const menAverageAge = getAverage(menAge);

  return menAverageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person) => {
    const hasChildren = people.some((child) => child.mother === person.name);

    return person.sex === 'f' && (withChildren ? hasChildren : true);
  }).map(person => person.died - person.born);

  return getAverage(women);
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
  const diffs = people.reduce((acc, person) => {
    const mother = people.find(p => p.name === person.mother);

    return mother
      ? [...acc, {
        diff: person.born - mother.born, sex: person.sex,
      }]
      : acc;
  }, []);

  return onlyWithSon
    ? getAverage(diffs.filter(d => d.sex === 'm').map(d => d.diff))
    : getAverage(diffs.map(d => d.diff));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const personMen = person => person.sex === 'm' && (!century
    || Math.ceil(person.died / 100) === century);
  const age = (sum, person) => sum + (person.died - person.born);

  const men = people.filter(personMen);
  const result = men.reduce(age, 0) / men.length;

  return result;
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
  const womenWithChildren = person => person.sex === 'f'
    && (!withChildren || people.some(p => p.mother === person.name));
  const age = (sum, person) => sum + (person.died - person.born);

  const women = people.filter(womenWithChildren);

  if (women.length === 0) {
    return 0;
  }

  const result = women.reduce(age, 0) / women.length;

  return result;
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
  const ageDifference = (child, mother) => child.born - mother.born;
  const childrenWithMothers = people.filter(child =>
    child.mother && people.some(mother => mother.name === child.mother)
  );

  if (onlyWithSon) {
    const sonsWithMothers = childrenWithMothers.filter(child =>
      child.sex === 'm' && people.some(mother => mother.name === child.mother)
    );

    if (sonsWithMothers.length === 0) {
      return 0;
    }

    const sumSons = sonsWithMothers.reduce((total, child) => {
      const mother = people.find(person => person.name === child.mother);

      return total + ageDifference(child, mother);
    }, 0);

    const averageAgeDiffSons = sumSons / sonsWithMothers.length;

    return averageAgeDiffSons;
  }

  if (childrenWithMothers.length === 0) {
    return 0;
  }

  const sum = childrenWithMothers.reduce((total, child) => {
    const mother = people.find(person => person.name === child.mother);

    return total + ageDifference(child, mother);
  }, 0);

  const averageAgeDiff = sum / childrenWithMothers.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

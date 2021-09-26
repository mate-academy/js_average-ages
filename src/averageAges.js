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
  const peopleFiltered = people.filter(person => person.sex === 'm');

  const averageAge = peopleFiltered
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / peopleFiltered.length;

  const menWithCentury = peopleFiltered
    .filter(person => Math.ceil(person.died / 100) === century);

  const averageAgeWithCentury = menWithCentury
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / menWithCentury.length;

  return (century) ? +averageAgeWithCentury.toFixed(2) : +averageAge.toFixed(2);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');

  const averageAge = women
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / women.length;

  const womenFilter = women
    .filter(person => people.some(child => child.mother === person.name));

  const womenAverageAge = womenFilter
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / womenFilter.length;

  return (withChildren) ? +womenAverageAge.toFixed(2) : +averageAge.toFixed(2);
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
  const mothers = people
    .filter(person => people.some(child => child.mother === person.name));

  const children = people
    .filter(child => mothers.find(mother => child.mother === mother.name));

  const ageDiff = children
    .map(child => child.born - (mothers
      .find(mother => child.mother === mother.name)).born)
    .reduce((a, b) => a + b) / children.length;

  const onlySon = children.filter(child => child.sex === 'm');

  const ageDiffSon = onlySon
    .map(child => child.born - mothers
      .find(mother => child.mother === mother.name).born)
    .reduce((a, b) => a + b) / onlySon.length;

  return (onlyWithSon) ? +ageDiffSon.toFixed(2) : +ageDiff.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

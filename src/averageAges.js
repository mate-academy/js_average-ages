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
function calculateAverage(age) {
  const sum = age.reduce((a, b) => {
    return (a + b);
  });
  const average = sum / age.length;

  return parseFloat(average.toFixed(2));
};

function calculateMenAverageAge(people, century) {
  const agesMans = people.map(person => (!century && person.sex === 'm')
    || (person.sex === 'm' && Math.ceil(person.died / 100) === century)
    ? person.died - person.born
    : null).filter(age => age);

  const mansAverage = calculateAverage(agesMans);

  return mansAverage;
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
  const women = people.filter(person => person.sex === 'f');
  const agesWomen = women.map(person =>
    people.some((element) => element.mother === person.name
   || !withChildren)
      ? person.died - person.born
      : null).filter(age => age);

  const womenAverage = calculateAverage(agesWomen);

  return womenAverage;
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
  const women = people.filter(person => person.sex === 'f');

  const agesMother = people.map(person =>
    women.some(element => (element.name === person.mother
    && person.sex === 'm') || ((element.name === person.mother)
      && !onlyWithSon))
      ? person.born - (women.filter(mom => mom.name === person.mother)[0].born)
      : null).filter(age => age);

  const motherAverage = calculateAverage(agesMother);

  return motherAverage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

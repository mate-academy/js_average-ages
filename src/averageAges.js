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
  const agesMans = people.map(person => (person.sex === 'm'
  && century === undefined)
  || (person.sex === 'm' && Math.ceil(person.died / 100) === century)
    ? person.died - person.born
    : undefined).filter(age => age !== undefined);

  const average = agesMans.reduce((a, b) => {
    return (a + b);
  });

  const mansAverage = average / agesMans.length;

  return parseFloat(mansAverage.toFixed(2));
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
   || withChildren === undefined)
      ? person.died - person.born
      : undefined).filter(age => age !== undefined);

  const average = agesWomen.reduce((a, b) => {
    return (a + b);
  });
  const womenAverage = average / agesWomen.length;

  return parseFloat(womenAverage.toFixed(2));
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
  && person.sex === 'm') || (element.name === person.mother
  && onlyWithSon === undefined))
      ? person.born - (women.filter(mom => mom.name === person.mother)[0].born)
      : undefined).filter(age => age !== undefined);

  const average = agesMother.reduce((a, b) => {
    return (a + b);
  });
  const motherAverage = average / agesMother.length;

  return parseFloat(motherAverage.toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

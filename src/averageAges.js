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
    const isMale = person.sex === 'm';
    const inCentury = century ? Math.ceil(person.died / 100) === century : true;

    return isMale && inCentury;
  });

  return calculateAverageYears(men);
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
    const isFemale = person.sex === 'f';
    const hasChildren = people.some(child => child.mother === person.name);

    return isFemale && (!withChildren || hasChildren);
  });

  return calculateAverageYears(women);
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
  const ageDiffs = [];

  people.forEach(person => {
    const isMaleOrNotOnlySon = !onlyWithSon || person.sex === 'm';
    const mother = people.find(p => p.name === person.mother);

    isMaleOrNotOnlySon && mother && ageDiffs.push(person.born - mother.born);
  });

  return ageDiffs.reduce((a, b) => (
    a + b
  ), 0) / ageDiffs.length;
}

function calculateAverageYears(arr) {
  const ages = arr.map(person => person.died - person.born);

  return ages.reduce((a, b) => (
    a + b
  ), 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

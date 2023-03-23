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
  const manFiltered = century === undefined
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  const manTotalAge = manFiltered.reduce((acum, value) =>
    acum + (value.died - value.born), 0);

  const manAverageAge = manTotalAge / manFiltered.length;

  return manAverageAge;
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
  const womanFiltered = withChildren === undefined
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name));

  const womanTotalAge = womanFiltered.reduce((acum, value) =>
    acum + (value.died - value.born), 0);

  const womanAverageAge = womanTotalAge / womanFiltered.length;

  return womanAverageAge;
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
  const kids = onlyWithSon === undefined
    ? people.filter(person => (people.some(mom => mom.name === person.mother)))
    : people.filter(person => (people.some(mom => mom.name === person.mother)
      && person.sex === 'm'));

  return kids.reduce((accumulator, person) => {
    const mother = people.find(woman => woman.name === person.mother);
    const ageDifference = person.born - mother.born;

    return accumulator + ageDifference;
  }, 0) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

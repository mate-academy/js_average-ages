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
  const isMaleDied = century
    ? people.filter(person => Math.ceil(person.died / 100) === century
      && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const maleAge = isMaleDied.map(person => person.died - person.born);

  return getAverageAge(maleAge);
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
  const isSheMother = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const femaleAge = isSheMother.map(person => person.died - person.born);

  return getAverageAge(femaleAge);
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
  const isOnlySon = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && person.mother)
    : people.filter(person => person.mother);

  const ageDifferences = isOnlySon.map(baby => {
    const mother = people.find(person => person.name === baby.mother);

    if (mother && baby.born && mother.born) {
      const ageDifference = baby.born - mother.born;

      return ageDifference;
    }
  });

  return getAverageAge(ageDifferences.filter(age => age));
}

function getAverageAge(years) {
  const totalYears = years.reduce((sum, age) => sum + age);
  const averageAge = totalYears / years.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

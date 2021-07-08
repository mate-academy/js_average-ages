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
  const menOnly = people.filter(person => person.sex === 'm');

  const menFiltered = century
    ? menOnly.filter(men => Math.ceil(men.died / 100) === century)
    : menOnly;

  const averageAgeOfMen = menFiltered
    .map(man => man.died - man.born)
    .reduce((sum, age) => sum + age) / menFiltered.length;

  return averageAgeOfMen;
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
  const womenFiltered = withChildren
    ? people.filter(
      woman => people.find(child => child.mother === woman.name))
    : people.filter(person => person.sex === 'f');

  const averageAgeOfWomen = womenFiltered
    .map(f => f.died - f.born)
    .reduce((sum, age) => sum + age) / womenFiltered.length;

  return averageAgeOfWomen;
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
  const children = people.filter(
    person => onlyWithSon
      ? person.sex === 'm'
      && people.some(women => women.name === person.mother)
      : people.some(woman => woman.name === person.mother)
  );

  const motherAge = children.map(
    child => {
      const mother = people.find(women => child.mother === women.name);

      return child.born - mother.born;
    });

  const averageAgeOfDifference = motherAge.reduce(
    (sum, age) => sum + age) / motherAge.length;

  return averageAgeOfDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

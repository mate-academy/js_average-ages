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
  const listOfAgeMen = people
    .filter(person => {
      return !century
        ? person.sex === 'm'
        : person.sex === 'm' && Math.ceil(person.died / 100) === century;
    })
    .map(man => man.died - man.born);

  const result = (
    listOfAgeMen
      .reduce((sum, age) => sum + age, 0) / listOfAgeMen.length);
  return result;
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
  const mothersNamesList = people.map(prop => prop.mother);

  const listOfAgeWomen = people
    .filter(person => {
      return typeof withChildren === 'undefined'
        ? person.sex === 'f'
        : mothersNamesList.includes(person.name);
    })
    .map(woman => woman.died - woman.born);

  const result = (
    listOfAgeWomen
      .reduce((sum, age) => sum + age, 0) / listOfAgeWomen.length);

  return result;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const listOfAgeDiff = people
    .map(child => {
      const mother = people.find(person => person.name === child.mother);
      return mother
        ? onlyWithSon && child.sex === 'm'
          ? child.born - mother.born
          : !onlyWithSon
            ? child.born - mother.born
            : undefined
        : undefined;
    })
    .filter(age => age);

  const result = (
    listOfAgeDiff.reduce((sum, age) => sum + age, 0) / listOfAgeDiff.length);

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

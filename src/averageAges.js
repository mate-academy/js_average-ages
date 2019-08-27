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
  let onlyMen = people.filter(person => person.sex === 'm');

  if (century) {
    onlyMen = onlyMen.filter(man => Math.ceil(man.died / 100) === century);
  }

  return onlyMen.reduce(
    (acc, man, i, arr) => acc + (man.died - man.born) / arr.length, 0);
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
  let onlyWomen = people.filter(person => person.sex === 'f');

  if (withChildren) {
    onlyWomen = onlyWomen.filter(
      woman => people.some(child => child.mother === woman.name));
  }

  return onlyWomen.reduce(
    (acc, woman, i, arr) => acc + (woman.died - woman.born) / arr.length, 0);
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
  const arrayAllDifferences = people.filter(
    person => people.some(
      child => child.mother === person.name && (
        !onlyWithSon || (onlyWithSon && child.sex) === 'm')))
    .reduce((diffAges, mother) => {
      const diffForMather = people.filter(
        child => child.mother === mother.name && (
          !onlyWithSon || (onlyWithSon && child.sex) === 'm'))
        .map(child => child.born - mother.born);
      diffAges.push(...diffForMather);

      return diffAges;
    }, []);

  return arrayAllDifferences.reduce((acc, item) => acc + item, 0
  ) / arrayAllDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

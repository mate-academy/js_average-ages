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
  let man = sexFilter(people, 'm');

  man = century
    ? man.filter(person => Math.ceil(person.died / 100) === century)
    : man;

  return arrayAverageAges(man);
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
  let woman = sexFilter(people, 'f');

  woman = withChildren
    ? people.filter(
      person => people.some(
        someOne => someOne.mother === person.name,
      ),
    )
    : woman;

  return arrayAverageAges(woman);
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
  const agesDiff = [];
  people.forEach(person => people.some(
    someOne => {
      const hasMother = person.mother === someOne.name;
      hasMother
      && (onlyWithSon
        ? (person.sex === 'm' && agesDiff.push(person.born - someOne.born))
        : agesDiff.push(person.born - someOne.born));
      return hasMother;
    },
  ));

  return arrayAverage(agesDiff);
}

/**
 * This function allows to filter incoming array by gender.
 *
 * @param {array} array
 * @param {'m' || 'f'} sex
 * @returns {array}
 */
function sexFilter(array, sex) {
  return array.filter(person => person.sex === sex);
}

/**
 * This function allows to calculate incoming array values average ages.
 *
 * @param {array} array
 * @returns {number}
 */
function arrayAverageAges(array) {
  return (array.reduce(
    (sum, current) => sum + (current.died - current.born)
    , 0) / array.length);
}

/**
 * This function allows to calculate incoming array values average.
 *
 * @param {array} array
 * @returns {number}
 */
function arrayAverage(array) {
  return (array.reduce(
    (sum, current) => sum + current, 0) / array.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

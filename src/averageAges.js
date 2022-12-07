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
  return (century)
    ? (people
      .filter((x) => (Math.ceil(x.died / 100) === century && x.sex === 'm'))
      .map((x) => (x.died - x.born))
      .reduce((x, y) => (x + y)))
    / (people
      .filter((x) => (Math.ceil(x.died / 100) === century && x.sex === 'm'))
      .length)
    : (people
      .filter((x) => (x.sex === 'm'))
      .map((x) => (x.died - x.born))
      .reduce((x, y) => (x + y)))
    / (people.filter((x) => (x.sex === 'm')).length);
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
  if (withChildren) {
    const arrayAllMothers = people.filter(x => x.mother).map(x => x.mother);
    const arrayWithChildren = [];

    people.forEach(item => {
      if (arrayAllMothers.includes(item.name)) {
        arrayWithChildren.push(item);
      }
    });

    return arrayWithChildren
      .map(x => x.died - x.born)
      .reduce((x, y) => (x + y)) / arrayWithChildren.length;
  }

  return (people
    .filter((x) => x.sex === 'f')
    .map((x) => (x.died - x.born))
    .reduce((x, y) => (x + y)))
      / (people
        .filter((x) => x.sex === 'f')
        .map((x) => (x.died - x.born)).length);
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
  // write code here
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const filteredPeopleArray
    = people.filter(
      x =>
        century
          ? Math.ceil(x.died / 100) === century && x.sex === 'm'
          : x.sex === 'm');
  const agesArray = filteredPeopleArray.map(x => x.died - x.born);

  return agesArray.reduce((p, c) => p + c) / filteredPeopleArray.length;
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
  const filteredWomenArray
    = people.filter(
      x =>
        withChildren
          ? people.some(b => b.mother === x.name) && x.sex === 'f'
          : x.sex === 'f');
  const womenAgesArray = filteredWomenArray.map(x => x.died - x.born);

  return womenAgesArray.reduce((p, c) => p + c) / filteredWomenArray.length;
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
  const peopleWithChildren
    = people.filter(x => onlyWithSon
      ? people.some(c => c.name === x.mother) && x.sex === 'm'
      : people.some(c => c.name === x.mother));

  const ageDiffs
    = peopleWithChildren.map(
      x => x.born - people.find(
        c => c.name === x.mother)
        .born);

  return ageDiffs.reduce((p, c) => p + c) / peopleWithChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

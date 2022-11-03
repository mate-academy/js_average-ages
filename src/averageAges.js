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

  let filteredByMales = people.filter(x => x.sex === 'm');

  filteredByMales = century
  ? filteredByMales.filter(
    x => Math.ceil(x.died / 100) === century)
  : filteredByMales;

  const agesArray = filteredByMales.map(x => x.died - x.born);

  return agesArray.reduce((p, c) => p + c) / filteredByMales.length;
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
  let filteredByWomen = people.filter(x => x.sex === 'f');

  filteredByWomen = withChildren
  ? filteredByWomen.filter(
    x => people.some(b => b.mother === x.name))
  : filteredByWomen;

  const womenAgesArray = filteredByWomen.map(x => x.died - x.born);

  return womenAgesArray.reduce((p, c) => p + c) / filteredByWomen.length;
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
  let filteredByChildren = people.filter(
    x => people.some(c => c.name === x.mother));

  filteredByChildren = onlyWithSon
  ? filteredByChildren.filter(
    x => x.sex === 'm')
  : filteredByChildren;

  const ageDifferencesArray
    = filteredByChildren.map(
      x => x.born - people.find(
        c => c.name === x.mother
      ).born
    );

  return ageDifferencesArray.reduce((p, c) => p + c)
  / filteredByChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

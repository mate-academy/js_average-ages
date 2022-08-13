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
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter(person => (
    person.sex === 'm' && (!century || century === Math.ceil(person.died / 100))
  ));
  const menAges = men.map(person => person.died - person.born);
  const menAgesSum = menAges.reduce((sum, age) => sum + age, 0);

  return menAgesSum / menAges.length;
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
  const mothers = people.map(person => person.mother);
  const women = people.filter(person => (
    person.sex === 'f' && (!withChildren || mothers.includes(person.name))
  ));
  const womenAges = women.map(person => person.died - person.born);
  const womenAgesSum = womenAges.reduce((sum, age) => sum + age, 0);

  return womenAgesSum / womenAges.length;
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
  const children = people.map(person => (
    [person.name, person.mother, person.sex, person.born]
  ));
  const mothers = children.map((child, i, arr) => (
    arr.find(person => person[0] === child[1])
  ));
  const totalInfo = children.map((child, i) => (
    [...child, mothers[i] !== undefined ? mothers[i][3] : undefined]
  ));
  const totalInfoFiltered = totalInfo.filter(years => (
    years[4] !== undefined && (!onlyWithSon || years[2] === 'm')
  ));
  const sumOfDiff = totalInfoFiltered.reduce((accumulator, years) => (
    accumulator + (years[3] - years[4])
  ), 0);

  return sumOfDiff / totalInfoFiltered.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

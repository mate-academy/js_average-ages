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

  let men, menAges;

  if (!century) {
    men = people.filter(item => (item.sex === 'm'));
    menAges = men.reduce((sum, item) => sum + (item.died - item.born), 0);

    return menAges / men.length;
  }

  men = people.filter(item => (item.sex === 'm')
    && Math.ceil(item.died / 100) === century);
  menAges = men.reduce((sum, item) => sum + (item.died - item.born), 0);

  return menAges / men.length;
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
  // write code here

  let women = people.filter(item => (item.sex === 'f'));

  if (withChildren) {
    women = women.filter(mothers =>
      people.some(item => item.mother === mothers.name));
  }

  const womanAges = women.reduce((sum, item) =>
    sum + (item.died - item.born), 0);

  return womanAges / women.length;
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
  // write code here

  let children;

  if (onlyWithSon) {
    children = people.filter(person =>
      (people.some(item => person.mother === item.name))
        && (person.sex === 'm'));
  } else {
    children = people.filter(person =>
      people.some(item => person.mother === item.name));
  }

  const yearsDifference = children.map(person =>
    person.born - people.find(mom =>
      mom.name === person.mother).born);

  const yearsDifferenceSum = yearsDifference.reduce((item, year) =>
    year + item, 0);

  return yearsDifferenceSum / yearsDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

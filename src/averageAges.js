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
function calculateMenAverageAge(people, century = false) {
  const allMen = century
    ? people.filter(person => person.sex === 'm'
    && century === Math.ceil(person.died / 100))
    : people.filter(person => person.sex === 'm');

  const AveregeAgeMen = allMen.map((yearOfMen) => yearOfMen.died
  - yearOfMen.born);

  const sumOfAges = AveregeAgeMen.reduce((sum, age) => sum + age);

  return sumOfAges / allMen.length;
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

function calculateWomenAverageAge(people, withChildren = false) {
  const filterWomen = withChildren
    ? people.filter(user => user.sex === 'f'
      && people.find(child => user.name === child.mother))
    : people.filter(user => user.sex === 'f');

  const array = filterWomen.map((yearOfWomen) => yearOfWomen.died
  - yearOfWomen.born);

  const sumOfAges = array.reduce((sum, age) => sum + age);

  return sumOfAges / filterWomen.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let containerChildren = onlyWithSon
    ? people.filter(user => user.sex === 'm' && user.mother !== null)
    : people.filter(user => user.mother !== null);

  containerChildren = containerChildren.filter(child =>
    people.find(user => user.name === child.mother));

  const diffArr = containerChildren.map(child =>
    child.born - people.find(user => user.name === child.mother).born);

  return diffArr.reduce((sum, age) => sum + age, 0) / diffArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

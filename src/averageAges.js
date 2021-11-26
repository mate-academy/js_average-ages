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

  const men = people.filter(person =>
    century
      ? person.sex === 'm' && (Math.ceil(person.died / 100) === century)
      : person.sex === 'm');
  const ages = men.map(item => item.died - item.born);
  const result = ages.reduce((sum, age) => sum + age, 0);

  return result / ages.length;
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
  const searchArr = people.filter((person) => {
    return withChildren
      ? person.sex === 'f' && people.filter((child) =>
        child.mother === person.name).length > 0
      : person.sex === 'f';
  });

  const ages = searchArr.map((person) => person.died - person.born);

  const result = ages.reduce((sum, age) => sum + age, 0);

  return result / ages.length;
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
  const allClildren = people.filter(person => {
    return onlyWithSon
      ? person.sex === 'm' && people.filter((mother) =>
        person.mother === mother.name).length > 0
      : people.filter((mother) =>
        person.mother === mother.name).length > 0;
  });

  const diferensAge = allClildren.map((child) => {
    const mother = people.filter((person) =>
      person.name === child.mother);

    return child.born - mother[0].born;
  });

  const sumAge = diferensAge.reduce((sum, item) => sum + item, 0);

  return sumAge / diferensAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

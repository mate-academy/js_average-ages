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

function getSumOfAge(listOfPeople) {
  return listOfPeople.reduce((sum, { born, died }) => {
    return sum + (died - born);
  }, 0);
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(({ sex }) => sex === 'm');

  const menInCentury = century
    ? men.filter(({ died }) => Math.ceil(died / 100) === century)
    : men;

  return getSumOfAge(menInCentury) / menInCentury.length;
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
  const women = people.filter(({ sex }) => sex === 'f');

  const womenWithKids = withChildren
    ? women.filter(({ name }) => people.some(({ mother }) => mother === name))
    : women;

  return getSumOfAge(womenWithKids) / womenWithKids.length;
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
  const kids = people.filter(({ mother }) => {
    return people.some(({ name }) => name === mother);
  });

  const kidsBoys = onlyWithSon
    ? kids.filter(({ sex }) => sex === 'm')
    : kids;

  const sumOfPeopleAges = kidsBoys.reduce((sum, { mother, born }) => {
    return sum + born - people.find(({ name }) => name === mother).born;
  }, 0);

  return sumOfPeopleAges / kidsBoys.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

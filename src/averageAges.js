/* eslint-disable no-unused-expressions */
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
  const filterCallBack = person =>
    arguments.length === 2
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm';

  const men = people.filter(filterCallBack);

  const reduceCallBack = (sum, person) =>
    sum + (person.died - person.born);

  const ageSum = men.reduce(reduceCallBack, 0);

  return ageSum / men.length;
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
  const filterCallBack = mommy =>
    withChildren === true
      ? mommy.sex === 'f' && people.find(person => person.mother === mommy.name)
      : mommy.sex === 'f';

  const women = people.filter(filterCallBack);

  const reduceCallBack = (sum, person) =>
    sum + (person.died - person.born);

  const ageSum = women.reduce(reduceCallBack, 0);

  return ageSum / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child
 * and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age
 * difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const filterCallBack = child =>
    onlyWithSon === true
      ? child.sex === 'm' && people.find(person => child.mother === person.name)
      : people.find(person => person.name === child.mother);

  const children = people.filter(filterCallBack);

  const reduceCallBack = (sum, child) =>
    sum + (child.born
      - people.find(person => child.mother === person.name).born);

  const ageSum = children.reduce(reduceCallBack, 0);

  return ageSum / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

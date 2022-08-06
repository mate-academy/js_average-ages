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
  const arrMen = people.filter((person) => century === undefined ? (
    person.sex === 'm') : (
    person.sex === 'm') && Math.ceil(person.died / 100) === century);

  const arrAges = arrMen.map((el) => (el.died - el.born));
  const ageSum = arrAges.reduce((sum, el) => sum + el);

  return ageSum / arrAges.length;
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
  // write code here
  const arrWomen = people.filter(
    (person) => withChildren === false ? person.sex === 'f' : (
      people.some((el) => el.mother === person.name)));

  const arrAges = arrWomen.map((el) => (el.died - el.born));
  const ageSum = arrAges.reduce((sum, el) => sum + el);

  return ageSum / arrAges.length;
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
  // write code here
  const arrWomen = people.filter((person) => onlyWithSon === false ? (
    people.some((el) => el.mother === person.name)) : people.some(
    (el) => el.mother === person.name && el.sex === 'm'));

  const arrChild = people.filter((person) => onlyWithSon === false ? (
    arrWomen.some((el) => el.name === person.mother))
    : arrWomen.some((el) => (el.name === person.mother && person.sex === 'm')));

  const arrAges = arrChild.map((child) => child.born - arrWomen.find(
    (el) => el.name === child.mother).born);

  const arrSumDiff = arrAges.reduce((sum, n) => sum + n);

  return arrSumDiff / arrAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

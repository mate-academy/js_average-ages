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
  const arrMen = people.filter((person) => century
    ? (person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : (person.sex === 'm'));

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
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const arrWomen = people.filter(
    (person) => withChildren
      ? (people.some((el) => el.mother === person.name))
      : person.sex === 'f');

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
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const arrWomen = people.filter((person) => onlyWithSon
    ? people.some((el) => el.mother === person.name && el.sex === 'm')
    : (people.some((el) => el.mother === person.name)));

  const arrChild = people.filter((person) => onlyWithSon
    ? arrWomen.some((el) => (el.name === person.mother && person.sex === 'm'))
    : (arrWomen.some((el) => el.name === person.mother)));

  const arrAges = arrChild.map((child) => child.born
    - arrWomen.find((el) => el.name === child.mother).born);

  const arrSumDiff = arrAges.reduce((sum, n) => sum + n);

  return arrSumDiff / arrAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

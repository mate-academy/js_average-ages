'use strict';

/**
 * @param {object[]} arr
 * @param {string} sex
 *
 * @return {object[]}
 */
function filterBySex(arr, sex) {
  return arr
    .filter(({ 'sex': currSex }) => currSex === sex);
}

/**
 * @param {object[]} arr
 * @param {number} century
 *
 * @return {object[]}
 */
function filterByCentury(arr, century) {
  return arr
    .filter(({ died }) => Math.ceil(died / 100) === century);
}

/**
 * @param {number} totalAge
 * @param {object} man
 *
 * @return {number}
 */
function sumAges(totalAge, { died, born }) {
  const age = died - born;

  return totalAge + age;
}

/**
 * @param {object[]} arr
 *
 * @return {object[]}
 */
function getMothers(arr) {
  const motherNames = arr
    .filter(({ mother }) => typeof mother === 'string')
    .map(({ mother }) => mother);

  return arr
    .filter(({ name }) => motherNames.indexOf(name) !== -1);
}

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
  const sex = 'm';

  let men = filterBySex(people, sex);

  if (arguments.length > 1) {
    men = filterByCentury(men, century);
  }

  const totalAge = men.reduce(sumAges, 0);
  const avgAge = totalAge / men.length;

  return avgAge;
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
  let women;

  if (withChildren) {
    women = getMothers(people);
  } else {
    const sex = 'f';

    women = filterBySex(people, sex);
  }

  const totalAge = women.reduce(sumAges, 0);
  const avgAge = totalAge / women.length;

  return avgAge;
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
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

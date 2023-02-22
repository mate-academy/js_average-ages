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
  const results = people.filter((data) =>
    !century ? data.sex === 'm'
      : data.sex === 'm' && Math.ceil(data.died / 100) === century);

  const res = results.reduce((total, data) => total + data.died - data.born, 0);

  return res / results.length;
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
  const results = people.filter((data) =>
    !withChildren ? data.sex === 'f'
      : data.sex === 'f' && people.some(val => val.mother === data.name));

  const res = results.reduce((total, data) => total + data.died - data.born, 0);

  return res / results.length;
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
  const results = onlyWithSon
    ? people.filter(data => data.sex === 'm'
      && people.some(mother => mother.name === data.mother))
    : people.filter(data =>
      people.some(mother => mother.name === data.mother));

  const res = results.reduce((total, data) => {
    const motherInfo = people.find(mother => mother.name === data.mother);

    return total + data.born - motherInfo.born;
  }, 0);

  return res / results.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

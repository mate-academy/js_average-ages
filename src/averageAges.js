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
function calculateMenAverageAge(people, century = 0) {
  const arrOfMan = (century === 0)
    ? people.filter(({ sex }) => sex === 'm')
    : people.filter(({ sex, died }) => sex === 'm'
      && Math.ceil(died / 100) === century);

  return arrOfMan.reduce((prev, { died, born }) =>
    prev + (died - born), 0) / arrOfMan.length;
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
  const arrOfWoman = !withChildren
    ? people.filter(({ sex }) => sex === 'f')
    : people.filter(({ name }) =>
      people.find(({ mother }) => name === mother));

  return arrOfWoman.reduce((prev, { died, born }) =>
    prev + (died - born), 0) / arrOfWoman.length;
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
  const arrChildWithMother = people.map(child => (
    {
      ...child,
      motherInfo: people.filter(({ name }) => name === child['mother']),
    })).filter(({ motherInfo }) => motherInfo.length > 0);

  let filterArr;

  onlyWithSon
    ? filterArr = arrChildWithMother.filter(({ sex }) => sex === 'm')
    : filterArr = arrChildWithMother;

  const callback = (prev, { born, motherInfo }) =>
    prev + (born - motherInfo[0]['born']);

  return filterArr.reduce(callback, 0) / filterArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

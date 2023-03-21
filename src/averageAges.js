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
const result = arr => Math.round((arr.reduce((prev, item) => prev
  + item) / arr.length) * 100) / 100;

function calculateMenAverageAge(people, century = 0) {
  const arrMan = !century
    ? people.filter(el => el.sex === 'm')
    : people.filter(el => el.sex === 'm'
    && century === Math.ceil(el.died / 100));

  const arrAge = arrMan.map(el => el.died - el.born);

  return result(arrAge);
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
  const womenArr = people.filter(el => el.sex === 'f');
  const motherArr = womenArr.filter(women =>
    people.some(el => el.mother === women.name));
  const callback = (el) => el.died - el.born;
  const arrAge = withChildren ? motherArr.map(callback)
    : womenArr.map(callback);

  return result(arrAge);
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
  const children = onlyWithSon
    ? people.filter(child => people.some(women => child.mother === women.name
      && child.sex === 'm'))
    : people.filter(child => people.some(women => child.mother === women.name));
  const arr = children.map(child => {
    const { born } = child;
    const mothers = people.find(moth => moth.name === child.mother);

    return born - mothers.born;
  });

  return result(arr);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

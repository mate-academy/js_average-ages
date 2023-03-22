/* eslint-disable max-len */
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
const averageAges = arrAge => Math.round((arrAge.reduce((prev, item) => prev
  + item) / arrAge.length) * 100) / 100;

function calculateMenAverageAge(people, century = 0) {
  const arrMan = !century
    ? people.filter(el => el.sex === 'm')
    : people.filter(el => el.sex === 'm'
    && century === Math.ceil(el.died / 100));

  const arrAgeMan = arrMan.map(el => el.died - el.born);

  return averageAges(arrAgeMan);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withchildrenArr` is
 // eslint-disable-next-line max-len, max-len, max-len
 * specified then function calculates average age only for women with childrenArr
 *
 * Hint: To check if a woman has childrenArr you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withchildrenArr - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withchildrenArr) {
  const womenArr = people.filter(el => el.sex === 'f');
  const motherArr = womenArr.filter(women =>
    people.some(el => el.mother === women.name));
  const callback = (el) => el.died - el.born;
  const arrAgeWomen = withchildrenArr ? motherArr.map(callback)
    : womenArr.map(callback);

  return averageAges(arrAgeWomen);
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
  const childrenArr = onlyWithSon
    ? people.filter(child => people.some(women => child.mother === women.name
      && child.sex === 'm'))
    : people.filter(child => people.some(women => child.mother === women.name));
  const arrAge = childrenArr.map(child => {
    const { born } = child;
    const mothers = people.find(moth => moth.name === child.mother);

    return born - mothers.born;
  });

  return averageAges(arrAge);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

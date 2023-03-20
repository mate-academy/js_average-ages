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
function calculateMenAverageAge(people, century) {
  const data = century
    ? people.filter(el => century === Math.ceil(el.died / 100) && el.sex === 'm')
    : people.filter(el => el.sex === 'm');

  const allAges = data.map(el => el.died - el.born);
  const average = (allAges.reduce((acc, el) => acc + el) / allAges.length).toFixed(2);

  return +average;
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
  const data = withChildren
    ? people.filter(el => el.mother !== null).map(el => el.mother)
    : people.filter(el => el.sex === 'f');

  const mothers = people.filter(el => data.includes(el.name));
  const avg = mothers.map(el => el.died - el.born);

  const allAges = data.map(el => el.died - el.born);
  const average = withChildren
    ? (avg.reduce((acc, el) => acc + el, 0) / avg.length).toFixed(2)
    : (allAges.reduce((acc, el) => acc + el, 0) / allAges.length).toFixed(2);

  return +average;
};

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
  const data = onlyWithSon
    ? people.filter(el => people.some(mom => mom.name === el.mother) && el.sex === 'm')
    : people.filter(el => people.some(mom => mom.name === el.mother));

  const average = data.reduce((acc, el) => {
    const mother = people.find(mom => mom.name === el.mother);
    const diference = el.born - mother.born;

    return acc + diference;
  }, 0);

  return +(average / data.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

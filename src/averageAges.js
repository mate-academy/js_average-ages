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
function calcAverageAge(arr) {
  return arr
    .map(item => item.died - item.born)
    .reduce((sum, a) => sum + a) / arr.length;
}

function calculateMenAverageAge(people, century) {
  return century !== undefined
    ? calcAverageAge(people.filter(item => item.sex === 'm'
      && Math.ceil(item.died / 100) === century))
    : calcAverageAge(people.filter(item => item.sex === 'm'));
};

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
  console.log('withChildren', withChildren);

  return withChildren
    ? calcAverageAge(people.filter(item => item.sex === 'f')
      .filter(item => people.some(value => value.mother === item.name)))
    : calcAverageAge(people.filter(item => item.sex === 'f'));
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at childbirth)
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
  const peopleHaveMother = calcAvarageAgeDiff(people, false);
  const sumAllAgesDiff = peopleHaveMother.reduce((sum, e) => sum + e, 0);
  const menHaveMother = calcAvarageAgeDiff(people, true);
  const sumSonsAgesDiff = menHaveMother.reduce((sum, e) => sum + e, 0);

  return onlyWithSon
    ? sumSonsAgesDiff / menHaveMother.length
    : sumAllAgesDiff / peopleHaveMother.length;
}

function calcAvarageAgeDiff(arr, son) {
  let result = arr.filter(kid => arr.some(mom => mom.name === kid.mother));

  if (son) {
    result = result.filter(kid => kid.sex === 'm');
  }

  return result
    .map(kid => kid.born - arr.find(mom => mom.name === kid.mother).born);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

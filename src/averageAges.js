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
  const manArray = people.filter(({ sex }) => sex === 'm');

  function Calculate(manData) {
    return +(manData.reduce((result, { born, died }) =>
      result + (died - born), 0) / manData.length)
      .toFixed(2);
  }

  return !century
    ? Calculate(manArray)
    : Calculate(manArray.filter(({ died }) =>
      century === Math.ceil(died / 100)
    ));
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womanArray = people.filter(({ sex }) => sex === 'f');

  function Calculate(data) {
    return +(data.reduce((result, { born, died }) =>
      result + (died - born), 0) / data.length)
      .toFixed(2);
  }

  return !withChildren
    ? Calculate(womanArray)
    : Calculate(people.filter(({ name }) =>
      people.some(({ mother }) =>
        mother === name)
    ));
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let childrenWidthMothers;

  !onlyWithSon
    ? childrenWidthMothers = people.filter(({ mother }) =>
      people.find(({ name }) => name === mother))

    : childrenWidthMothers = people.filter(({ sex }) => sex === 'm')
      .filter(({ mother }) =>
        people.find(({ name }) => name === mother));

  const differenceAges = childrenWidthMothers.reduce(function(sum, current) {
    const motherBornDate = people.find(({ name }) =>
      name === current.mother).born;

    return sum + (current.born - motherBornDate);
  }
  , 0);

  return +(differenceAges / childrenWidthMothers.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

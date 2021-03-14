'use strict';

function getAverage({ sum, count }, val) {
  return {
    sum: sum + val,
    count: count + 1,
  };
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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const reducedData = people
    .filter(
      ({ died, sex }) => century
        ? Math.ceil(died / 100) === century && sex === 'm'
        : sex === 'm'
    )
    .map(({ died, born }) => died - born)
    .reduce(getAverage, {
      sum: 0,
      count: 0,
    });

  return reducedData.sum / reducedData.count;
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
  // write code here

  const reducedData = people
    .filter(
      ({ sex, name }) => {
        return (sex === 'f')
          && (!withChildren || people.some(({ mother }) => mother === name));
      })
    .map(({ died, born }) => died - born)
    .reduce(getAverage, {
      sum: 0,
      count: 0,
    });

  return reducedData.sum / reducedData.count;
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
  // write code here

  const reducedData = people
    .filter(
      ({ mother, sex }) => (!onlyWithSon || sex === 'm')
        && people.some(({ name }) => name === mother))
    .map(({ mother, born }) => {
      const mothers = people.filter(({ name }) => name === mother);

      return born - mothers[0].born;
    })
    .reduce(getAverage, {
      sum: 0,
      count: 0,
    });

  return reducedData.sum / reducedData.count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men = (!century)
    ? people.filter(el => (el.sex === 'm'))
    : people.filter(el => (el.sex === 'm')
      && (Math.ceil(el.died / 100) === century));

  const menAge = men.map(callbackAge);

  return (menAge.reduce(callbackSum)) / menAge.length;
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
  const women = (withChildren)
    ? people.filter(el => (el.sex === 'f')
      && people.some(value => value.mother === el.name))
    : people.filter(el => (el.sex === 'f'));

  const womenAge = women.map(callbackAge);

  return (womenAge.reduce(callbackSum)) / womenAge.length;
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
  const child = onlyWithSon
    ? people.filter(el => el.sex === 'm'
        && people.some(value => el.mother === value.name))
    : people.filter(el => people.some(value => el.mother === value.name));

  const callback = (valueChild) => {
    const motherChild = people.find(valuePeople =>
      valuePeople.name === valueChild.mother);

    return valueChild.born - motherChild.born;
  };
  const differenceAge = child.map(callback);

  const result = (differenceAge.reduce(callbackSum))
  / differenceAge.length;

  return result;
}

function callbackAge(value) {
  return value.died - value.born;
};

function callbackSum(sum, value) {
  return sum + value;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

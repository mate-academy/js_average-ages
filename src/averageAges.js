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
  const getData = people.filter(person => person.sex === 'm');

  const getDataWithCentury = people
    .filter(person => Math.ceil(person.died / 100) === 18
      && person.sex === 'm');

  const getListOfMens = century !== 0 ? getDataWithCentury : getData;

  const getListOfAges = getListOfMens.map(person => person.died - person.born);

  const sumOfAges = getListOfAges.reduce((prev, item) => prev + item, 0);

  return sumOfAges / getListOfAges.length;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let womenList = people.filter((person) => person.sex === 'f');

  womenList = (withChildren)
    ? womenList = womenList.filter(({ name }) => (
      people.some(({ mother }) => mother === name)
    ))
    : womenList;

  const totalAge = womenList.reduce((total, { born, died }) =>
    total + (died - born),
  0);

  return totalAge / womenList.length;
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
  let childrenList = people.filter(({ mother }) => {
    return people.some(({ name }) => mother === name);
  });

  childrenList = (onlyWithSon === true)
    ? childrenList.filter(({ sex }) => sex === 'm')
    : childrenList;

  const ageDiffList = childrenList.map(({ mother, born }) => {
    const motherRef = people.find(({ name }) => name === mother);

    return born - motherRef.born;
  });

  const totalAge = ageDiffList.reduce((total, diff) =>
    total + diff,
  0);

  return totalAge / ageDiffList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  let menList = people.filter((person) => person.sex === 'm');

  menList = (century !== undefined)
    ? menList = menList.filter((person) =>
      Math.ceil(person.died / 100) === century
    )
    : menList;

  const totalAge = menList.reduce((total, { born, died }) =>
    total + (died - born),
  0);

  return totalAge / menList.length;
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

  womenList = (withChildren === true)
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
  let childrenList = people.filter(function hasMotherInList({ mother }) {
    return people.some(({ name }) => mother === name);
  });

  childrenList = (onlyWithSon === true)
    ? childrenList.filter(({ sex }) => sex === 'm')
    : childrenList;

  const ageDiffList = childrenList.map(function findAgeDiff({ mother, born }) {
    const motherRef = people.find(({ name }) => name === mother);

    return born - motherRef.born;
  });

  const totalAge = ageDiffList.reduce((total, diff) =>
    total + (diff),
  0);

  return totalAge / ageDiffList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

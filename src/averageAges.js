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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const mens = people.filter(human => {
    return (century)
      ? (human.sex === 'm')
          && (human.died / 100 >= century - 1
            && human.died / 100 < century)
      : (human.sex === 'm');
  });

  return mens.reduce((sum, man, i, arr) =>
    sum + (man.died - man.born) / arr.length, 0);
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
  // write code here
  const hasChildren = (mom, arr) => {
    return arr.some(doughter => doughter.mother === mom.name);
  };

  const femens = people.filter((human, i, arr) => {
    return (withChildren)
      ? (human.sex === 'f') && hasChildren(human, arr)
      : (human.sex === 'f');
  });

  return femens.reduce((sum, femen, i, arr) =>
    sum + (femen.died - femen.born) / arr.length, 0);
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

  const hasMum = (child, humans) => {
    return humans.some(human => human.name === child.mother);
  };

  const children = people.filter((child, i, persons) => {
    return (onlyWithSon)
      ? (child.sex === 'm') && hasMum(child, persons)
      : hasMum(child, persons);
  });

  const getDiff = (child, humans) => {
    const mama = humans.find(human => human.name === child.mother);

    return child.born - mama.born;
  };

  const ageDiff = children.reduce((sum, child, i, arr) => {
    return sum + (getDiff(child, people) / arr.length);
  }, 0);

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

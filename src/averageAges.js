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

  const mens = people.filter(person => {
    return !century ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century;
  });

  const sum = mens.reduce((prev, age) => prev + (age.died - age.born), 0);

  return sum / mens.length;
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
  // write code here

  const findWomen = people.filter((person, i, array) => {
    const children = array.find(child => child.mother === person.name);

    return !withChildren ? person.sex === 'f' : person.sex === 'f' && children;
  });

  const sum = findWomen.reduce((prev, age) => prev + (age.died - age.born), 0);

  return sum / findWomen.length;
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
  function findMom(child) {
    return people.find(person => person.name === child.mother);
  }

  function checkMother(child) {
    const hasMother = findMom(child);

    return onlyWithSon ? hasMother && child.sex === 'm' : hasMother;
  }

  const childrenWithMother = people.filter(checkMother);

  const sumOfDifferenceAge = childrenWithMother.reduce((accum, child) => {
    const difference = child.born - findMom(child).born;

    return accum + difference;
  }, 0);

  return sumOfDifferenceAge / childrenWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

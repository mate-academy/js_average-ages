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
const getAverage = arr => {
  const sum = arr.reduce((totalAmount, currentValue) => (
    totalAmount + currentValue
  ));

  return sum / arr.length;
};

function calculateMenAverageAge(people, century = 0) {
  let allMen = people.filter(person => person.sex === 'm');

  if (century !== 0) {
    allMen = allMen.filter(man => (
      Math.ceil(man.died / 100) === century
    ));
  }

  const ageOfMen = allMen.map(guy => guy.died - guy.born);

  return getAverage(ageOfMen);

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
function calculateWomenAverageAge(people, withChildren = 0) {
  let allWomen = people.filter(person => person.sex === 'f');

  if (withChildren !== 0) {
    allWomen = allWomen.filter(mum => (
      people.filter(child => child.mother === mum.name).length > 0
    ));
  }

  const ageOfWomen = allWomen.map(lady => lady.died - lady.born);

  return getAverage(ageOfWomen);
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
  let allChildren = people.filter(
    child => people.some(person => child.mother === person.name)
  ); // people who have mother === our children

  if (onlyWithSon) {
    allChildren = allChildren.filter(child => child.sex === 'm');
  } // our chilren - only boys

  const ageDiff = allChildren.map(child => {
    const mum = people.find(person => (
      person.name === child.mother));

    const ageOfChild = child.born;

    return ageOfChild - mum.born;
  });

  return getAverage(ageDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

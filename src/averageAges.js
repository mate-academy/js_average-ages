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
function calculateMenAverageAge(people, century = false) {
  const males = people.filter((male) => {
    return century === false
      ? male.sex === 'm'
      : (male.sex === 'm' && Math.ceil(male.died / 100) === century);
  });

  return calculateAverage(males);
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
function calculateWomenAverageAge(people, withChildren = false) {
  // write code here
  const females = people.filter((female) => {
    return withChildren === false
      ? female.sex === 'f'
      : (people.find((man) => man.mother === female.name));
  });

  return calculateAverage(females);
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const mothers = people.filter((female) => female.sex === 'f');
  const childs = mothers.flatMap((mother) => {
    return people.filter((person) => {
      return onlyWithSon === false
        ? person.mother === mother.name
        : (person.mother === mother.name && person.sex === 'm');
    });
  });

  return +(mothers.reduce((accumulator, mother) => {
    let currentMother = 0;

    childs.forEach((child) => {
      if (mother.name === child.mother) {
        currentMother += child.born - mother.born;
      }
    });

    return accumulator + currentMother;
  }, 0) / childs.length).toFixed(2);
}

function calculateAverage(people) {
  return +(people.reduce((accumulator, currentValue) => {
    return (accumulator + (currentValue.died - currentValue.born));
  }, 0) / people.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

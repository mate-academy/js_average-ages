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
  const checkCondition = function(person) {
    const checkSex = person.sex === 'm';
    const checkCentury = Math.ceil(person.died / 100) === century;

    return century ? checkSex && checkCentury : checkSex;
  };

  const menCount = people.filter(person => checkCondition(person));

  const calculateAge = menCount
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / menCount.length;

  return calculateAge;
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
  const filteredWomen = people.filter((person) => person.sex === 'f');
  const filteredMothers = [];

  for (const key of filteredWomen) {
    const checkCondition = people.some(women => key.name === women.mother);

    if (checkCondition) {
      filteredMothers.push(key);
    }
  };

  function checkWhoToCompare(compare) {
    return compare
      .map(age => age.died - age.born)
      .reduce((a, b) => a + b, 0) / compare.length;
  }

  return withChildren
    ? checkWhoToCompare(filteredMothers)
    : checkWhoToCompare(filteredWomen);
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
  // write code here
  const filterWomen = people.filter((person) => person.sex === 'f');

  const mothers = [];
  const ageDiffChildMother = [];
  const ageDiffSonMother = [];

  for (const key of filterWomen) {
    people.some(child => {
      if (key.name === child.mother) {
        mothers.push(key);

        if (onlyWithSon && child.sex === 'm') {
          ageDiffSonMother.push(child.born - key.born);
        }

        ageDiffChildMother.push(child.born - key.born);
      }
    });
  };

  function checkWhoToCompare(compare) {
    return compare.reduce((a, b) => a + b, 0) / compare.length;
  }

  return onlyWithSon
    ? checkWhoToCompare(ageDiffSonMother)
    : checkWhoToCompare(ageDiffChildMother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

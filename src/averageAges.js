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

function getAverageValue(numbers) {
  return numbers.reduce((prevNumber, nextNumber) => {
    return prevNumber + nextNumber;
  }, 0) / numbers.length;
}

function getAverageAge(peoples) {
  return getAverageValue(peoples.map(person => person.died - person.born));
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filterMenCallback = function(person) {
    const isMan = person.sex === 'm';
    const isSameCentury = Math.ceil(person.died / 100) === century;

    return century ? isMan && isSameCentury : isMan;
  };

  const filteredMen = people.filter(person => filterMenCallback(person));
  const calculateAge = getAverageAge(filteredMen);

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

  for (const woman of filteredWomen) {
    const isMother = people.some(peoples => woman.name === peoples.mother);

    if (isMother) {
      filteredMothers.push(woman);
    }
  };

  return withChildren
    ? getAverageAge(filteredMothers)
    : getAverageAge(filteredWomen);
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
    people.forEach(child => {
      if (key.name === child.mother) {
        mothers.push(key);

        if (onlyWithSon && child.sex === 'm') {
          ageDiffSonMother.push(child.born - key.born);
        }

        ageDiffChildMother.push(child.born - key.born);
      }
    });
  };

  return onlyWithSon
    ? getAverageValue(ageDiffSonMother)
    : getAverageValue(ageDiffChildMother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

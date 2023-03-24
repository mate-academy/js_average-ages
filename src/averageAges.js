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

function getAges(people) {
  return people.map((human) => human.died - human.born);
}

function getAverage(nums) {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function calculateMenAverageAge(people, century) {
  const filteredPeople = century
    ? people.filter(person =>
      century === Math.ceil(person.died / 100) && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const ages = filteredPeople.map(person => person.died - person.born);
  const avgAges = ages.reduce((acc, value) => acc + value, 0);

  return avgAges / ages.length;
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
  const mothers = people
    .map(human => human.mother)
    .filter(name => name !== null);

  const women = people
    .filter((human) => human.sex === 'f')
    .filter((human) => !withChildren || mothers.includes(human.name));
  const ages = getAges(women);

  return getAverage(ages);
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
  const hasMother = (arr, value) => {
    return arr.some(mother => mother.name === value);
  };

  const findMom = people.filter(person => onlyWithSon
    ? hasMother(people, person.mother) && person.sex === 'm'
    : hasMother(people, person.mother));

  const averageDifference = (findMom.reduce((acc, woman) => {
    const mother = people.find(mom => mom.name === woman.mother);
    const difference = woman.born - mother.born;

    return acc + difference;
  }, 0) / findMom.length);

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

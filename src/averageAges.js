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
  const manForCalculate = people.filter((person) => {
    if (century) {
      return Math.ceil(person.died / 100) === century && person.sex === isMan;
    } else {
      return person.sex === isMan;
    }
  });

  return averageAge(manForCalculate);
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
  const womanForCalculate = people.filter((person) => {
    if (withChildren) {
      return (people.some(child => child.mother === person.name));
    } else {
      return person.sex === 'f';
    }
  });

  return averageAge(womanForCalculate);
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
  const children = people.filter(person =>
    onlyWithSon
      ? people.find(mam =>
        mam.name === person.mother) && person.sex === 'm'
      : people.find(mam => mam.name === person.mother));

  const womanWithChildren = children
    .map(child =>
      child.born - people.find(woman =>
        woman.name === child.mother).born);

  return calculateDiff(womanWithChildren);
}

function averageAge(array) {
  const totalAge = array.map(person => person.died - person.born)
    .reduce((add, age) => add + age);

  return +(totalAge / array.length).toFixed(2);
}

function calculateDiff(array) {
  return array.reduce((add, age) => add + age) / array.length;
}

const isMan = 'm';

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

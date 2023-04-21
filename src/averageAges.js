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
function calculateMenAverageAge(people, century = true) {
  const filterPeoples = people.filter(person =>
    person.sex === 'm'
    && (century === Math.ceil(person.died / 100) || century === true)
  );

  return +avrageAge(filterPeoples).toFixed(2);
}

function avrageAge(arr) {
  return arr.reduce((sum, { died, born }) =>
    sum + (died - born), 0) / arr.length;
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
  const filterPeoples = people.filter(person =>
    person.sex === 'f'
    && (people.some(child =>
      child.mother === person.name) || withChildren === false)
  );

  return +avrageAge(filterPeoples).toFixed(2);
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
  const difference = [];

  onlyWithSon ? people.map(({ mother, sex, born }) => people.some(mom =>
    mother === mom.name && (sex === 'm' && difference.push(born - mom.born))))

    : people.map(({ mother, born }) => people.some(mom =>
      mother === mom.name && difference.push(born - mom.born)));

  const averageAge = difference.reduce((sum, num) => sum + num);

  return +(averageAge / difference.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

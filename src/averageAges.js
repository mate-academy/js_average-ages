'use strict';

/** basic function for calculating average ages in the incoming array*/

function calcAverageAge(people) {
  return people
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / people.length;
} 

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
  const forMen = people
    .filter(person => person.sex === 'm'
      && (!century || century === Math.ceil(person.died / 100)));

  return calcAverageAge(forMen);
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
  const haveChildren = people
    .map(person => person.mother)
    .filter(name => name !== null);

  const forWomen = people
    .filter(person => person.sex === 'f'
      && (!withChildren || haveChildren.includes(person.name)));

  return calcAverageAge(forWomen);
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
  const forChildren = people
    .filter(child => onlyWithSon ? people.find(
      person => child.sex === 'm' && child.mother === person.name) : people
      .find(person => child.mother === person.name)
    );

  const ageDifferences = forChildren
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born);

  return ageDifferences
    .reduce((a, b) => a + b, 0) / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

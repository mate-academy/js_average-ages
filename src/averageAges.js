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
  return getAverage(
    people
      .filter(person => person.sex === 'm')
      .filter(person => !century || getCentury(person) === century)
      .map(person => person.died - person.born)
  );
};

function getCentury(person) {
  return Math.ceil(person.died / 100);
}

function getAverage(numbers) {
  return numbers.reduce((sum, current) => sum + current) / numbers.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  return getAverage(
    people
      .filter(person => person.sex === 'f')
      .filter(woman => !withChildren || getChildren(people, woman).length > 0)
      .map(person => person.died - person.born)
  );
}

function getChildren(people, person) {
  return people.filter(child => child.mother === person.name);
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
  return getAverage(
    people
      .filter(person => !onlyWithSon || person.sex === 'm')
      .map(child => [child, getMother(people, child)])
      .filter(([, mother]) => mother)
      .map(([child, mother]) => child.born - mother.born)
  );
}

function getMother(people, person) {
  return people.find(mother => mother.name === person.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

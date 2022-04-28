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

function calculatAverageAge(arr, minuend, subtracted) {
  const result = arr.reduce((sum, person) => {
    return sum + (person[minuend] - person[subtracted]);
  }, 0) / arr.length;

  return result;
}

function calculateMenAverageAge(people, century) {
  const allMen = century
    ? people.filter(person => (
      Math.ceil(person.died / 100) === century && person.sex === 'm'))
    : people.filter(person => person.sex === 'm');

  const result = calculatAverageAge(allMen, 'died', 'born');

  return result;
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
  const allWomen = withChildren
    ? people.filter(person => (
      person.sex === 'f' && people.some(chaild => (
        chaild.mother === person.name))))
    : people.filter(person => person.sex === 'f');

  const result = calculatAverageAge(allWomen, 'died', 'born');

  return result;
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
  const children = onlyWithSon
    ? people.filter(kid => (
      kid.sex === 'm' && people.some(mother => (
        kid.mother === mother.name))))
    : people.filter(kid => (
      people.some(mother => kid.mother === mother.name)));

  const result = children.reduce((sum, chaild) => {
    const motherOfChaild = people.find(mom => chaild.mother === mom.name);

    return sum + (chaild.born - motherOfChaild.born);
  }, 0) / children.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

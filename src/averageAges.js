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
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const ages = men.map(person => person.died - person.born);
  const agesSum = ages.reduce((previos, current) => previos + current);

  return agesSum / men.length;
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
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && people.find(child => person.name === child.mother)
    : person.sex === 'f');

  const ages = women.map(person => person.died - person.born);
  const agesSum = ages.reduce((previos, current) => previos + current);

  return agesSum / women.length;
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
  const children = people.filter(person => onlyWithSon
    ? person.sex === 'm' && checkIfMotherExist(people, person.mother)
    : checkIfMotherExist(people, person.mother));

  const ageDifference = children.map(person => (
    person.born - getMotherAge(people, person.mother)
  ));
  const ageDifferenceSum = ageDifference.reduce((prev, x) => prev + x);

  return ageDifferenceSum / children.length;

  function checkIfMotherExist(arr, mothersName) {
    return arr.some(person => person.name === mothersName);
  }

  function getMotherAge(arr, mothersName) {
    const mother = arr.find(person => person.name === mothersName);

    return mother.born;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

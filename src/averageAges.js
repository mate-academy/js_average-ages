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
  const foundedMen = people.filter(men => (century)
    ? (Math.ceil(men.died / 100)) === century && men.sex === 'm'
    : men.sex === 'm');

  const menAges = foundedMen.map(person => person.died - person.born);

  return menAges.reduce((a, b) => a + b) / menAges.length;
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
  const foundedWomen = people.filter(women => (withChildren)
    ? women.sex === 'f' && (
      people.find(mother => mother.mother === women.name))
    : women.sex === 'f'
  );

  const womenAges = foundedWomen.map(women => women.died - women.born);

  return womenAges.reduce((a, b) => a + b) / womenAges.length;
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
  const parents = people.filter(person => (onlyWithSon)
    ? person.sex === 'm' && (
      people.find(mother => person.mother === mother.name))
    : people.find(mother => person.mother === mother.name)
  );

  function getMotherByYear(param) {
    return people.find(mother => param === mother.name);
  }

  const diffAge = parents.map(person => person.born
    - getMotherByYear(person.mother).born);

  return diffAge.reduce((a, b) => a + b) / diffAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

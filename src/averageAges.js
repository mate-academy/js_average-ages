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
  const menList = people.filter(person => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  ));

  const yearsOfLife = menList.map((person) => person.died - person.born);

  return calculateAverageAge(yearsOfLife);
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
  const womenList = people.filter(person => (
    withChildren
      ? person.sex === 'f' && people.find(kid => person.name === kid.mother)
      : person.sex === 'f'
  ));

  const yearsOfLife = womenList.map(person => person.died - person.born);

  return calculateAverageAge(yearsOfLife);
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
  const childrenList = people.filter(person => (
    onlyWithSon
      ? (people.some(findPerson => person.mother === findPerson.name))
        && person.sex === 'm'
      : (people.some(child => person.mother === child.name))
  ));

  const yearsOfLife = childrenList.map(child =>
    child.born - people.find(mother => child.mother === mother.name).born);

  return calculateAverageAge(yearsOfLife);
}

function calculateAverageAge(list) {
  return list.reduce((previous, next) => previous + next, 0) / list.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

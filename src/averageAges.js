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

const getAge = function(ages) {
  return ages.reduce((sum, age) => sum + age, 0) / ages.length;
};

function calculateMenAverageAge(people, century) {
  const ageOfmen = people
    .filter(person => century
      ? (person.sex === 'm' && Math.ceil(person.died / 100) === century)
      : (person.sex === 'm'))
    .map(man => man.died - man.born);

  return getAge(ageOfmen);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const ageOfWomen = people
    .filter(person => withChildren
      ? person.sex === 'f' && people.some(child => person.name === child.mother)
      : person.sex === 'f')
    .map(women => women.died - women.born);

  return getAge(ageOfWomen);
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
  const children = people
    .filter(person => onlyWithSon
      ? person.sex === 'm' && people.some(mom => person.mother === mom.name)
      : people.some(mother => person.mother === mother.name));

  const ageDifference = children.map(child =>
    child.born - people.find(mother => child.mother === mother.name).born);

  return getAge(ageDifference);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

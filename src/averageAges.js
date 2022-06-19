'use strict';

function getAge(person) {
  return person.died - person.born;
}

function getAverageAge(arrOfAges) {
  return arrOfAges
    .reduce((sum, person) => sum + getAge(person), 0) / arrOfAges.length;
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
  const menAges = people
    .filter(person => century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
    );

  return getAverageAge(menAges);
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
  const womenAges = people
    .filter(person => withChildren
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f'
    );

  return getAverageAge(womenAges);
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
  const children = people
    .filter(person => onlyWithSon
      ? people.some(mom => person.mother === mom.name) && person.sex === 'm'
      : people.some(mom => person.mother === mom.name)
    );

  const avgAgeDiff = children
    .reduce((sum, child) => sum + (
      child.born - people.find(mom => child.mother === mom.name).born), 0
    ) / children.length;

  return avgAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

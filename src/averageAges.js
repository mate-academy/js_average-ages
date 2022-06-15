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
  const averegeAge = people
    .filter(man => century
      ? Math.ceil(man.died / 100) === century && man.sex === 'm'
      : man.sex === 'm')
    .reduce((prev, current, i, arr) => (i < arr.length - 1)
      ? prev + (current.died - current.born)
      : (prev + (current.died - current.born)) / arr.length, 0);

  return averegeAge;
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
  const averegeAge = people
    .filter(women => withChildren
      ? people.some(child => child.mother === women.name)
      && women.sex === 'f'
      : women.sex === 'f')
    .reduce((prev, current, i, arr) => (i < arr.length - 1)
      ? prev + (current.died - current.born)
      : (prev + (current.died - current.born)) / arr.length, 0);

  return averegeAge;
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
  const averegeAge = people
    .filter(child => onlyWithSon
      ? people.some(mother => child.mother === mother.name)
      && child.sex === 'm'
      : people.some(mother => child.mother === mother.name))
    .reduce((prev, child, i, arr) => (i < arr.length - 1)
      ? prev + (child.born - people.find(mom => child.mother === mom.name).born)
      : (prev + (child.born - people.find(
        mom => child.mother === mom.name).born)) / arr.length, 0);

  return averegeAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

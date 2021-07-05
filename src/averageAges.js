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
  let result;
  const filtered = people.filter(man => man.sex === 'm');
  const centuryFilter = filtered.filter(person =>
    Math.ceil(person.died / 100) === century);

  arguments.length < 2 ? (
    result = filtered.reduce((sum, current) => {
      return sum + (current.died - current.born) / filtered.length;
    }, 0)
  ) : (
    result = centuryFilter.reduce((sum, current) => {
      return sum + (current.died - current.born) / centuryFilter.length;
    }, 0)
  );

  return result;
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
  let result;
  const filtered = people.filter(women => women.sex === 'f');
  const motherFilter = people.filter(person =>
    people.find(child => child.mother === person.name));

  withChildren ? (
    result = motherFilter.reduce((sum, current) => {
      return sum + (current.died - current.born) / motherFilter.length;
    }, 0)
  ) : (
    result = filtered.reduce((sum, current) => {
      return sum + (current.died - current.born) / filtered.length;
    }, 0)
  );

  return result;
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
  const mothers = people.filter(mother => mother.sex === 'f');
  const children = people.filter(person => onlyWithSon
    ? people.find(child => child.name === person.mother && person.sex === 'm')
    : people.find(child => child.name === person.mother)
  );

  const ageDifference = children.map(child => {
    const childMother = mothers.find(mother => child.mother === mother.name);

    return child.born - childMother.born;
  });

  const averageAgeDiff = ageDifference.reduce((acc, motherAge) => {
    return (acc + motherAge);
  }, 0) / ageDifference.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

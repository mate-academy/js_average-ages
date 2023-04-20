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
  const filter = century
    ? people.filter(
      person => Math.ceil(person.died / 100) === century && person.sex === 'm'
    )
    : people.filter(person => person.sex === 'm');

  const result = filter.reduce(
    (sum, man) => sum + (man.died - man.born), 0
  ) / filter.length;

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
  const filter = withChildren
    ? people.filter(
      person => person.sex === 'f'
      && people.some(child => child.mother === person.name)
    )
    : people.filter(person => person.sex === 'f');

  const result = filter.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0) / filter.length;

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
  const motherFilter = people.filter(person => {
    return people.some(child => child.mother === person.name);
  });

  const childrenFilter = onlyWithSon
    ? people.filter(
      child => child.sex === 'm'
      && motherFilter.find(mother =>
        mother.name === child.mother)
    )
    : people.filter(
      child => motherFilter.find(mother =>
        mother.name === child.mother)
    );

  const AgeFilter = childrenFilter.map(child => child.born - motherFilter
    .find(mother => mother.name === child.mother).born);

  const result = AgeFilter.reduce((sum, difference) =>
    sum + difference) / AgeFilter.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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

function calculateAverageAge(people) {
  return people.reduce((acc, person) =>
    acc + (person.died - person.born), 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const menFilteredAges = people
    .filter(person => century
      ? person.sex === 'm'
        && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
    );

  return calculateAverageAge(menFilteredAges);
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
  const womenFilteredAges = people
    .filter(person => withChildren
      ? person.sex === 'f'
      && people.some(p => p.mother === person.name)
      : person.sex === 'f'
    );

  return calculateAverageAge(womenFilteredAges);
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
  const filteredChildren = people.filter(person => onlyWithSon
    ? people.some(mother => mother.name === person.mother
      && person.sex === 'm')
    : people.find(mother => mother.name === person.mother)
  );

  const ageDiffernce = filteredChildren.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  return ageDiffernce.reduce((a, b) => a + b) / ageDiffernce.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

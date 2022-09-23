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

function averageAge(people) {
  const ages = people.map(person => person.died - person.born);

  return ages.reduce((a, b) => a + b) / ages.length;
}

function calculateMenAverageAge(people, century) {
  const filteredMen = people.filter(person => ((century > 0)
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm')
  );

  return averageAge(filteredMen);
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
  const filteredWomen = people.filter(person => (withChildren !== undefined)
    ? people.find(child => child.mother === person.name)
    : person.sex === 'f');

  return averageAge(filteredWomen);
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
  const children = people.filter(child => (onlyWithSon !== undefined)
    ? people.find(mother => child.mother === mother.name && child.sex === 'm')
    : people.find(mother => child.mother === mother.name));

  const difference = children.map(child =>
    (child.born - people.find(mother => mother.name === child.mother).born));

  const ages = difference.reduce((sum, current) => sum + current);

  return ages / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

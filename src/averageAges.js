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
  const allMen = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);

  const menAge = getLifeDurationList(allMen);

  return getAverageAge(menAge);
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
  const allWoman = (withChildren)
    ? people.filter(person => person.sex === 'f'
    && people.some(personMather => person.name === personMather.mother))
    : people.filter(person => person.sex === 'f');

  const womenAge = getLifeDurationList(allWoman);

  return getAverageAge(womenAge);
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
  const childs = (onlyWithSon)
    ? people.filter(person => person.sex === 'm'
    && people.some(mother => person.mother === mother.name))
    : people.filter(person => people.some(mother =>
      person.mother === mother.name));

  const getDifferencesOfAge = childs.map(child => child.born
    - people.find(mother => child.mother === mother.name).born);

  return getAverageAge(getDifferencesOfAge);
}

const getLifeDurationList = arr => arr.map(person => person.died - person.born);

const getAverageAge = arr => arr.reduce((sum, age) => sum + age) / arr.length;

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

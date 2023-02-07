'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const callBackFilter = (person) =>
    century > 0
      ? (person.sex === 'm' && Math.ceil(person.died / 100) === century)
      : person.sex === 'm';

  const callBackReduce = (sum, person) => sum + (person.died - person.born);
  const mans = people.filter(callBackFilter);
  const result = mans.reduce(callBackReduce, 0) / mans.length;

  return result;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const callBackFilter = (person) =>
    withChildren === true
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f';

  const callBackReduce = (sum, person) =>
    sum + (person.died - person.born);

  const womans = people.filter(callBackFilter);
  const result = womans.reduce(callBackReduce, 0) / womans.length;

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
  const callBackFilter = (child) =>
    onlyWithSon === true
      ? people.some(mother => child.mother === mother.name
        && child.sex === 'm')
      : people.some(mother => child.mother === mother.name);

  const callBackReduce = (sum, child) =>
    sum + (child.born
      - people.find(mother => mother.name === child.mother).born);

  const children = people.filter(callBackFilter);
  const result = children.reduce(callBackReduce, 0) / children.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

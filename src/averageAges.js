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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  function withCentury(person) {
    return person.sex === 'm' && Math.ceil(person.died / 100) === century;
  }

  function noCentury(person) {
    return person.sex === 'm';
  }

  const ages = people.filter(century ? withCentury : noCentury);

  return ages.reduce(
    (prev, cur) => prev + (cur.died - cur.born), 0
  ) / ages.length;
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
  const ages = people
    .filter(withChildren
      ? mother => mother.sex === 'f'
        && people.find(child => child.mother === mother.name)
      : mother => mother.sex === 'f')
    .map(mother => mother.died - mother.born);

  return ages.reduce((prev, cur) => prev + cur) / ages.length;
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
  const mothers = people
    .filter(mother => mother.sex === 'f' && people.find(child => onlyWithSon
      ? child.sex === 'm' && child.mother === mother.name
      : child.mother === mother.name));
  const children = people
    .filter(son => onlyWithSon
      ? son.sex === 'm' && people.find(mother => mother.name === son.mother)
      : people.find(mother => mother.name === son.mother));

  const agesDiff = children.map(child =>
    child.born - mothers.find(mother => mother.name === child.mother).born);

  return agesDiff.reduce((prev, cur) => prev + cur) / agesDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

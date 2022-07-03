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
  const men = (century === undefined)
    ? people.filter(elem => elem.sex === 'm')
    : (people.filter(elem => elem.sex === 'm')).filter(elem =>
      (Math.ceil(elem.died / 100) === century));

  const menYearsLive = men.map((elem) => elem.died - elem.born);

  return (menYearsLive.reduce((previousValue, currentValue) =>
    previousValue + currentValue) / menYearsLive.length).toFixed(2) * 1;
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
  const women = (withChildren !== true)
    ? people.filter(elem => elem.sex === 'f')
    : (people.filter(elem => elem.sex === 'f')).filter(mother =>
      people.some(child => mother.name === child.mother));

  const womenYearsLive = women.map((elem) => elem.died - elem.born);

  return (womenYearsLive.reduce((previousValue, currentValue) =>
    previousValue + currentValue) / womenYearsLive.length).toFixed(2) * 1;
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
  const children = (onlyWithSon !== true)
    ? people.filter(child =>
      (people.find(mother => child.mother === mother.name)))
    : people.filter(child => (people.find(mother =>
      child.mother === mother.name && child.sex === 'm')));

  const averageAgeDiff = children.map(child => (
    child.born - people.find(woman => woman.name === child.mother).born
  ));

  return (averageAgeDiff.reduce((previousValue, currentValue) =>
    previousValue + currentValue) / averageAgeDiff.length).toFixed(2) * 1;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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

  const manFilter = century
    ? people.filter(item => item.sex === 'm'
    && Math.ceil(item.died / 100) === century)
    : people.filter(item => item.sex === 'm');

  const manAge = manFilter.map(item => item.died - item.born)
    .reduce((sum, current) => sum + current, 0);

  return (Math.ceil(manAge / manFilter.length * 1000) / 1000);
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
  const motherList
  = people.filter(item => item.mother).map(item => item.mother);

  const womanList = withChildren
    ? people.filter(item => item.sex === 'f' && motherList.includes(item.name))
    : people.filter(item => item.sex === 'f');

  const womanAge = womanList.map(item => item.died - item.born)
    .reduce((sum, current) => sum + current, 0);

  return (Math.ceil(womanAge / womanList.length * 1000) / 1000);
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
  const ageList = onlyWithSon
    ? (people.filter(item => item.sex === 'm'
  && people.find(mother => item.mother === mother.name)))
    : people.filter(item => people.find(mother => item.mother === mother.name));

  const diff = ageList.map(child => (
    child.born - people.find(mother => child.mother === mother.name).born)
  ).reduce((sum, current) => sum + current, 0);

  return (Math.floor(diff / ageList.length * 1000) / 1000);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

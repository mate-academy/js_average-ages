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
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filteredPeople = (arguments.length > 1)
    ? people.filter(
      person => Math.ceil(person.died / 100) === century && person.sex === 'm')
    : people.filter(person => person.sex === 'm');
  const ages = filteredPeople.map(person => person.died - person.born);

  return Number((ages.reduce((a, b) => a + b) / ages.length).toFixed(2));
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
  const filteredWomans = people.filter(person => person.sex === 'f');
  const ages = (withChildren
    ? filteredWomans.filter(
      person => people.some(human => human.mother === person.name))
    : filteredWomans)
    .map(person => person.died - person.born);

  return Number((ages.reduce((a, b) => a + b) / ages.length).toFixed(2));
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
  const filteredWomans = people.filter(person => person.sex === 'f');
  const childrens = onlyWithSon
    ? people.filter(
      person => person.sex === 'm' && filteredWomans
        .some(mother => mother.name === person.mother))
    : people.filter(person => filteredWomans
      .some(mother => mother.name === person.mother));
  const agesDiff = childrens.map(child => child.born
    - filteredWomans.find(mother => child.mother === mother.name).born);

  return Number(
    (agesDiff.reduce((a, b) => a + b) / agesDiff.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

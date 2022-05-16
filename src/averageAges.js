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
  const filteredArray = century ? people.filter(
    person => person.sex === 'm' && Math.ceil(person.died / 100)
      === century) : people.filter(person => person.sex === 'm');

  const average = filteredArray.reduce(
    (all, person) => all + (person.died - person.born)
    / filteredArray.length, 0);

  return +average.toFixed(2);
}

// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  const filteredArray = withChildren ? people.filter(
    woman => woman.sex === 'f' && people.some(
      child => child.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');

  const average = filteredArray.reduce(
    (all, woman) => all + (woman.died - woman.born)
      / filteredArray.length, 0);

  return +average.toFixed(2);
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
  const filteredArray = people.filter(child =>
    onlyWithSon
      ? child.sex === 'm' && people.some(
        woman => woman.name === child.mother)
      : people.some(woman => woman.name === child.mother)
  );

  const difference = filteredArray.map(
    kid => kid.born - people.find(mother => kid.mother === mother.name).born);

  const ageDifference = difference.reduce(
    (sum, age) => sum + age, 0) / difference.length;

  return +ageDifference.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
const sexFilterMaker = value => person => person.sex === value;
const ageCallback = person => person.died - person.born;
const getAverage = array => {
  const amountOfAges = array.reduce(
    (acсumulator, currentValue) => acсumulator + currentValue);
  const average = amountOfAges / array.length;

  return +average.toFixed(2);
};

function calculateMenAverageAge(people, century) {
  let men = people.filter(sexFilterMaker('m'));

  men = century
    ? men.filter(person => Math.ceil(person.died / 100) === century) : men;

  return getAverage(men.map(ageCallback));
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(sexFilterMaker('f'));

  women = withChildren ? women.filter(woman => people.find(
    person => person.mother === woman.name)) : women;

  return getAverage(women.map(ageCallback));
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => onlyWithSon
    ? people.find(mom => mom.name === child.mother) && child.sex === 'm'
    : people.find(mom => mom.name === child.mother));

  const diffs = children.map(child =>
    child.born - people.find(mom => mom.name === child.mother).born);

  return getAverage(diffs);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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

function averageAge(ages) {
  return ages.reduce(
    (sumOfAges, curAge) => sumOfAges + curAge) / ages.length;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let menAges = [];

  century === undefined
    ? menAges = people.filter((person) => person.sex === 'm').map(
      (person) => person.died - person.born)
    : menAges = people.filter(
      (person) => person.sex === 'm' && Math.ceil(
        person.died / 100) === century).map(
      (person) => person.died - person.born);

  return averageAge(menAges);
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
  let womenAges = [];

  withChildren === undefined || false
    ? womenAges = people.filter(person => person.sex === 'f').map(
      person => person.died - person.born)
    : womenAges = people.filter(person => people.some(
      child => person.name === child.mother)).map(
      person => person.died - person.born);

  return averageAge(womenAges);
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
  let children = [];

  onlyWithSon === undefined || false
    ? children = people.filter(child => people.some(
      mother => child.mother === mother.name))
    : children = people.filter(child => people.some(
      mother => child.mother === mother.name && child.sex === 'm'));

  // const mothers = people.filter(person => people.some(
  //   child => person.name === child.mother));
  // const motherWithSonAges = people.filter(person => people.some(
  //   child => person.name === child.mother && child.sex === 'm'));

  const motherAges = children.map(
    child => child.born - people.find(
      mother => child.mother === mother.name).born
  );

  // onlyWithSon === undefined || false
  //   ? motherAges = mothers.map(
  //     person => (people.find(
  //       child => person.name === child.mother)).born - person.born)
  //   : motherAges = motherWithSonAges.map(
  //     person => (people.find(
  //       child => person.name === child.mother
  //       && child.sex === 'm')).born - person.born);

  return averageAge(motherAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

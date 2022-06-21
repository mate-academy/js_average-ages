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
  let men = people.filter(person => person.sex === 'm');

  const menInCentury = men.filter(
    person => Math.ceil(person.died / 100) === century);

  men = (!century) ? men : menInCentury;

  const averageAge = men.map(person => person.died - person.born)
    .reduce((prevVal, curVal) => prevVal + curVal, 0) / men.length;

  return averageAge;
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
  let women = people.filter(person => person.sex === 'f');

  const womenWithChild = women.filter(
    person => people.some(child => person.name === child.mother));

  women = (!withChildren) ? women : womenWithChild;

  const averageAge = women.map(person => person.died - person.born)
    .reduce((prevVal, curVal) => prevVal + curVal, 0) / women.length;

  return averageAge;
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
  let children = people.filter(
    child => people.some(mom => mom.name === child.mother)
  );

  const son = children.filter(child => child.sex === 'm');

  children = (!onlyWithSon) ? children : son;

  const agesDiff = children.map(
    child => child.born - people.find(pers => pers.name === child.mother).born);

  const averageAgesDiff = agesDiff.reduce(
    (prevVal, curVal) => prevVal + curVal, 0) / children.length;

  return averageAgesDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

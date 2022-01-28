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
  const onlyMan = century
    ? people.filter(person => (
      person.sex === 'm' && century === Math.ceil(person.died / 100)))
    : people.filter(person => person.sex === 'm');

  const onlyManAges = onlyMan.map(person => person.died - person.born);

  return onlyManAges.reduce((a, b) => a + b) / onlyManAges.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  // write code here
  const onlyWoman = withChildren
    ? people.filter(person => (
      person.sex === 'f' && people.some(children => (
        children.mother === person.name))))
    : people.filter(person => person.sex === 'f');

  const onlyWomanAges = onlyWoman.map(person => person.died - person.born);

  return onlyWomanAges.reduce((a, b) => a + b) / onlyWomanAges.length;
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
  // write code here
  const sons = people.filter(person => (
    people.some(mother => mother.name === person.mother) && (
      (onlyWithSon) ? person.sex === 'm' : true)));

  const ages = sons.map(son => (
    son.born - people.find(mother => mother.name === son.mother).born));

  const sumAges = ages.reduce((prev, val) => (
    prev + val));

  return Math.round(sumAges / ages.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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

  const mens = people.filter(person => person.sex === 'm');
  const ages = mens.reduce(
    (sum, person) => sum + (person.died - person.born),
    0,
  ) / mens.length;

  const mansWithCentury = mens.filter(
    person => Math.ceil(person.died / 100) === century
  );

  const agesWithCentury = mansWithCentury.reduce(
    (sum, person) => sum + (person.died - person.born),
    0,
  ) / mansWithCentury.length;

  return century ? agesWithCentury : ages;
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
  const women = people.filter(
    (person) => person.sex === 'f');
  const ages = women.reduce(
    (sum, woman) =>
      sum + (woman.died - woman.born),
    0,
  ) / women.length;

  const childrenWithMother = people.filter(
    (person) => person.mother !== null);
  const mothers = people.filter((woman) =>
    childrenWithMother.some(
      (person) => woman.name === person.mother));

  const momAge = mothers.reduce(
    (sum, mom) =>
      sum + (mom.died - mom.born),
    0,
  ) / mothers.length;

  return withChildren ? momAge : ages;
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
  const child = people.filter(
    (person) => people.some(
      (mom) => mom.name === person.mother));
  const childAges = child.map(
    (person) => person.born - people.find(
      (mom) => mom.name === person.mother).born);
  const diff = childAges.reduce(
    (person, mom) => person + mom
  ) / child.length;

  const sons = people.filter(
    person => people.some(
      mom => person.mother === mom.name) && person.sex === 'm');
  const sonsAges = sons.map(
    son => son.born - people.find(
      mom => mom.name === son.mother).born);
  const sonsAgesDiff = sonsAges.reduce(
    (son, mom) => son + mom
  ) / sons.length;

  return onlyWithSon ? sonsAgesDiff : diff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

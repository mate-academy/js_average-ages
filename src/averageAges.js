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
  let ages = [];

  century > 0
    ? ages
      = people.filter((person) => Math.ceil(person.died / 100) === century
      && person.sex === 'm')
        .map((person) => person.died - person.born)
    : ages = people.filter((person) => person.sex === 'm')
      .map((person) => person.died - person.born);

  return ages.reduce((prev, item) => prev + item, 0) / ages.length;
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
  // write code here
  let ages = [];
  const mothers = people.map((person) => person.mother);

  withChildren
    ? ages
      = people.filter((person) => mothers.includes(person.name)
      && person.sex === 'f')
        .map((person) => person.died - person.born)
    : ages = people.filter((person) => person.sex === 'f')
      .map((person) => person.died - person.born);

  return ages.reduce((prev, item) => prev + item, 0) / ages.length;
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
  // write code here
  let ageDiff = [];
  let mothers;

  onlyWithSon
    ? mothers = people.filter((person) => person.sex === 'm'
      && person.moter !== null)
      .map((person) => person.mother)
    : mothers = people.filter((person) => person.mother !== null)
      .map((person) => person.mother);

  mothers = mothers.filter((mother) =>
    people.map((person) => person.name).includes(mother));

  onlyWithSon
    ? ageDiff
      = people.filter((person) => person.sex === 'm'
        && mothers.includes(person.mother))
        .map((person) => {
          return person.born
        - people.filter((human) => person.mother === human.name)
          .map((human) => human.born);
        })
    : ageDiff
      = people.filter((person) => mothers.includes(person.mother))
        .map((person) => {
          return person.born
        - people.filter((human) => person.mother === human.name)
          .map((human) => human.born);
        });

  return ageDiff.reduce((prev, item) => prev + item, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

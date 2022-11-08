'use strict';

// const people = require("./people");

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
  const men = personGender('m', people);
  const male = century
    ? men.filter(person => (
      century === Math.ceil(person.died / 100)
    ))
    : men;

  return calculateAvarageAge(male);
}

function calculateAvarageAge(people) {
  return people.reduce((sum, person) => (
    sum + (person.died - person.born)
  ), 0) / people.length;
};

function personGender(gender, people) {
  return people.filter(person => person.sex === gender);
};

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
  const women = personGender('f', people);
  const female = withChildren
    ? women.filter(woman => (
      people.find(person => person.mother === woman.name)
    ))
    : women;

  return calculateAvarageAge(female);
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
  const kids = people.filter(child => (
    people.find(person => child.mother === person.name)
  ));

  const children = onlyWithSon
    ? personGender('m', kids)
    : kids;

  const findAgeDifference = children.map(child => (
    child.born - people.find(person => (
      person.name === child.mother)).born
  ));

  return findAgeDifference.reduce((sum, child) =>
    sum + child, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

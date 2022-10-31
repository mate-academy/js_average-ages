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
  const male = !century
    ? personGender('m', people)
    : personGender('m', people).filter(man =>
      (century === Math.ceil(man.died / 100)));

  return calculateAvarageAge(male);
}

const calculateAvarageAge = (people) => {
  return people.reduce((sum, person) => (
    sum + (person.died - person.born)), 0)
  / people.length;
};

const personGender = (gender, people) => {
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
  const female = !withChildren
    ? personGender('f', people)
    : personGender('f', people).filter(woman => (
      people.find(person => person.mother === woman.name)));

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
  const children = !onlyWithSon
    ? people.filter(child => (
      people.find(person => child.mother === person.name)
    ))
    : people.filter(child => (
      people.find(person => child.mother === person.name) && child.sex === 'm'
    ));

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

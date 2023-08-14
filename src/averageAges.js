'use strict';

const SEX_MALE = 'm';
const SEX_FEMALE = 'f';
const CENTURY_VALUE = 100;

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
  const men = people
    .filter((person) => person.sex === SEX_MALE
     && (century ? getCentry(person.died) === century : true)
    );

  return calculateAverageAge(men);
}

function calculateAverageAge(people) {
  return people
    .reduce((acc, person) => acc + getAge(person), 0) / people.length;
}

function getAge(person) {
  return person.died - person.born;
}

function getCentry(deathYear) {
  return Math.ceil(deathYear / CENTURY_VALUE);
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
  const women = people
    .filter((person) => person.sex === SEX_FEMALE
     && (withChildren ? hasChildren(person, people) : true)
    );

  return calculateAverageAge(women);
}

function hasChildren(child, people) {
  return people.some((mother) => mother.mother === child.name);
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
  const peopleWithMother = people.filter((child) => (
    people.some((mother) => mother.name === child.mother)
      && (onlyWithSon ? child.sex === SEX_MALE : true)
  ));

  return peopleWithMother.reduce((acc, person) => {
    const mother = people.find((human) => human.name === person.mother);
    const ageDiff = person.born - mother.born;

    return acc + ageDiff;
  }, 0) / peopleWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

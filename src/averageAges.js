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
  const men = separateBySex(people, 'm');

  const diedInCentury = men.filter(man => centuryDied(man) === century);

  const age = !century ? men : diedInCentury;

  return averageAge(age);
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
  const women = separateBySex(people, 'f');

  const age = !withChildren
    ? women
    : women.filter(
      person => people.find(child => child.mother === person.name));

  return averageAge(age);
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
  let children = people
    .filter(
      person => people.some(mother => person.mother === mother.name)
    );

  children = !onlyWithSon ? children : separateBySex(children, 'm');

  const agesDifference = children.map(
    child => child.born - people
      .find(mother => mother.name === child.mother).born
  );

  const averageDifference = agesDifference.reduce(sum, 0) / children.length;

  return averageDifference;
}

const sum = (a, b) => a + b;

const averageAge = people => people.map(
  (person) => person.died - person.born).reduce(sum, 0) / people.length;

const separateBySex = (
  people, sex) => people.filter(person => person.sex === sex
);

function centuryDied(person) {
  return Math.ceil(person.died / 100);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

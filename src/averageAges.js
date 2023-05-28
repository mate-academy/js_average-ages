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

function getMenDiedInGivenCentury(men, century) {
  return men.filter(person => (
    Math.ceil(person.died / 100) === century && person.sex === 'm'
  ));
}

function getWomanWithChild(people) {
  return people.filter(person => (
    people.some(child => child.mother === person.name)
  ));
}

function getSons(women, people) {
  return people.filter(child => (
    women.some(mother => mother.name === child.mother) && child.sex === 'm'
  ));
}

function sumOfAgesCallback(acc, person) {
  return acc + (person.died - person.born);
}

function calculateMenAverageAge(people, century) {
  const men = century
    ? getMenDiedInGivenCentury(people, century)
    : people.filter(person => person.sex === 'm');
  const averageMenAge = men.reduce(sumOfAgesCallback, 0) / men.length;

  return averageMenAge;
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
  const women = withChildren
    ? getWomanWithChild(people)
    : people.filter(person => person.sex === 'f');
  const averageWomanAge = women.reduce(sumOfAgesCallback, 0) / women.length;

  return averageWomanAge;
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
  const women = people.filter(person => person.sex === 'f');
  const children = onlyWithSon
    ? getSons(women, people)
    : people.filter(child => (
      women.some(mother => mother.name === child.mother)
    ));
  const averageAgeDiff = children
    .map(child => {
      const mother = women.filter(person => person.name === child.mother);

      return child.born - mother[0].born;
    })
    .reduce((acc, diff) =>
      (acc + diff), 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

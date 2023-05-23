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
    Math.ceil(person.died / 100) === century
  ));
}

function getWomanWithChild(womans, people) {
  return womans.filter(person => (
    people.some(child => child.mother === person.name)
  ));
}

function getSons(women, people) {
  return people.filter(child => (
    women.some(mother => mother.name === child.mother) && child.sex === 'm'
  ));
}

function getSumOfAges(acc, person) {
  return acc + (person.died - person.born);
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  let averageManAge;

  century
    ? averageManAge = getMenDiedInGivenCentury(men, century)
      .reduce(getSumOfAges, 0) / getMenDiedInGivenCentury(men, century).length

    : averageManAge = men.reduce(getSumOfAges, 0) / men.length;

  return averageManAge;
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
  const women = people.filter(person => person.sex === 'f');
  let averageWomanAge;

  withChildren
    ? averageWomanAge = getWomanWithChild(women, people)
      .reduce(getSumOfAges, 0) / getWomanWithChild(women, people).length

    : averageWomanAge = women
      .reduce(getSumOfAges, 0) / women.length;

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
  let averageAgeDiff;
  const women = people.filter(person => person.sex === 'f');
  const children = people.filter(child => (
    women.some(mother => mother.name === child.mother)
  ));

  onlyWithSon
    ? averageAgeDiff = getSons(women, people)
      .map(child => {
        const mother = women.filter(person => person.name === child.mother);

        return child.born - mother[0].born;
      })
      .reduce((acc, diff) =>
        (acc + diff), 0) / getSons(women, people).length

    : averageAgeDiff = children
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

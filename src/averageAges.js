'use strict';

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

const FEMALE_GENDER = 'f';
const MALE_GENDER = 'm';

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => isMan(person)
    && (century
      ? centuryFromYear(person.died) === century
      : true)
  );

  return getAverageAge(men);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person) => isWoman(person)
    && (withChildren
      ? people.some((child) => child.mother === person.name)
      : true));

  return getAverageAge(women);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter((child) => (
    people.some(mother => mother.name === child.mother)
          && (onlyWithSon
            ? isMan(child)
            : true)
  ));

  const sumOfDifference = children.reduce((sum, child) => {
    const mother = people.find((woman) => child.mother === woman.name);
    const difference = child.born - mother.born;

    return sum + difference;
  }, 0);

  const averageDifference = Math.round(
    sumOfDifference / children.length
    * 100) / 100;

  return averageDifference;
}

function centuryFromYear(year) {
  return Math.ceil(year / 100);
}

function isMan(people) {
  return people.sex === MALE_GENDER;
}

function isWoman(people) {
  return people.sex === FEMALE_GENDER;
}

function getAverageAge(people) {
  const sumOfAges = people
    .reduce((sum, person) => sum + (person.died - person.born), 0);

  const average = sumOfAges / people.length;

  return Math.round(average * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

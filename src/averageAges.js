'use strict';

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => isMan(person)
    && (century
      ? centuryFromYear(person.died) === century
      : true)
  );

  return averageAge(men);
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

  return averageAge(women);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter((child) => {
    return people
      .some(mother => mother.name === child.mother)
          && (onlyWithSon
            ? isMan(child)
            : true);
  });

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

function centuryFromYear(value) {
  return Math.ceil(value / 100);
}

function isMan(value) {
  const MALE_GENDER = 'm';

  return value.sex === MALE_GENDER;
}

function isWoman(value) {
  const FEMALE_GENDER = 'f';

  return value.sex === FEMALE_GENDER;
}

function averageAge(value) {
  const sumOfAges = value
    .map((person) => person.died - person.born)
    .reduce((sum, age) => sum + age, 0);

  const average = sumOfAges / value.length;

  return Math.round(average * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

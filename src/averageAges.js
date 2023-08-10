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
  const men = people.filter((person) => isMan(person)
    && (century
      ? centuryFromYear(person.died) === century
      : true)
  );

  return averageAge(men);
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
  const women = people.filter((person) => isWoman(person)
    && (withChildren
      ? people.some((child) => child.mother === person.name)
      : true));

  return averageAge(women);
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

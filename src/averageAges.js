/* eslint-disable no-console */
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

const SEX_MALE = 'm';
const SEX_FEMALE = 'f';
const ONE_CENTURY = 100;

function reduceAverage(array) {
  return array.reduce((personAge, person) => {
    return personAge + (person.died - person.born) / array.length;
  }, 0);
}

function calculateMenAverageAge(people, century) {
  const filteredMen = people.filter(person => {
    return person.sex !== SEX_MALE
      ? false
      : century !== undefined
        ? Math.ceil(person.died / ONE_CENTURY) === century
        : true;
  });

  return reduceAverage(filteredMen);
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
  const filteredWomenPeople = people.filter(el => {
    return el.sex !== SEX_FEMALE
      ? false
      : withChildren === true
        ? people.some(({ mother }) => mother === el.name)
        : true;
  });

  return reduceAverage(filteredWomenPeople);
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
  const children = people.filter(child => {
    return onlyWithSon
      ? people.find(person => child.sex === SEX_MALE
        && child.mother === person.name)
      : people.some((person) => {
        return child.mother === person.name;
      });
  });

  return children.reduce((acc, child) => {
    const findMotherForChild = people.find(mother => {
      return child.mother === mother.name;
    }).born;

    return acc + child.born - findMotherForChild;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

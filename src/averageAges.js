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
  const checkResult = people.filter((person) =>
    century
      ? (Boolean(calcCentury(person, century)) && person.sex === 'm')
      : person.sex === 'm'
  );

  return calculateAverage(checkResult);
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
  const checkResult = people.filter((person) =>
    withChildren
      ? (people.find((child) => person.name === child.mother))
      : person.sex === 'f'
  );

  return calculateAverage(checkResult);
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
  const children = people.filter((person) =>
    onlyWithSon
      ? (Boolean(findMother(people, person)) && person.sex === 'm')
      : Boolean(findMother(people, person))
  );

  return (
    children.reduce(
      (acc, cur) => acc + (cur.born - findMother(people, cur).born),
      0
    ) / children.length
  );
}

function calculateAverage(filteredData) {
  return (
    filteredData.reduce((acc, cur) => acc + (cur.died - cur.born), 0)
    / filteredData.length
  );
}

function findMother(people, person) {
  return people.find((female) => person.mother === female.name);
}

function calcCentury(person, century) {
  return Math.ceil(person.died / 100) === century;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

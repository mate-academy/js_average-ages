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
const averageOfPeople = (people) =>
  people.reduce((acc, item) => acc + item.died - item.born, 0) / people.length;

function calculateMenAverageAge(people, century) {
  const arrayOfMen = people.filter((person) => {
    return century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  return averageOfPeople(arrayOfMen);
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
  const mothersNames = [
    ...new Set(people.map((person) => person.mother || 'not specified')),
  ];
  const arrayOfWoman = people.filter((person) => {
    return withChildren
      ? mothersNames.includes(person.name)
      : person.sex === 'f';
  });

  return averageOfPeople(arrayOfWoman);
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const arrayOfDiff = people.filter((person) => {
    const motherOfperson = people
      .find((mother) => mother.name === person.mother);

    return onlyWithSon ? motherOfperson && person.sex === 'm' : motherOfperson;
  });

  const result = arrayOfDiff.reduce((acc, person) => {
    const motherOfperson = people
      .find((mother) => mother.name === person.mother);

    return acc + person.born - motherOfperson.born;
  }, 0) / arrayOfDiff.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

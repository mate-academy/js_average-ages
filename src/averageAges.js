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
const CENTURY_VALUE = 100;

function calculateMenAverageAge(people, century) {
  const filteredPeopleByMan = people.filter(person => person.sex === SEX_MALE
    && (century
      ? Math.ceil(person.died / CENTURY_VALUE) === century
      : true
    ));

  const avgAgeOfMan = calculateAverageAge(filteredPeopleByMan);

  return avgAgeOfMan;
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
  const filteredWomen = people
    .filter(person => person.sex === SEX_FEMALE
      && (withChildren
        ? people.some((child) => child.mother === person.name)
        : true
      ));

  const avgAgeOfWomen = calculateAverageAge(filteredWomen);

  return avgAgeOfWomen;
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
  const childrens = people.filter(person => person.mother !== null
    && (onlyWithSon
      ? person.sex === SEX_MALE
      : true
    ));

  const ageDifferences = childrens.map(({ mother: motherName, born }) => {
    const mother = people.find(({ name }) => name === motherName);

    return mother ? born - mother.born : null;
  }).filter(element => element !== null);

  const averageAgeDifference = ageDifferences
    .reduce((acc, value) => acc + value) / ageDifferences.length;

  return averageAgeDifference;
};

function calculateAverageAge(ageDifferences) {
  const totalAgeDifference = ageDifferences
    .reduce((acc, { died, born }) => acc + (died - born), 0);

  return totalAgeDifference / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

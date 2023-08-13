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
  const filteredPeopleByMan = people
    .filter(({ sex }) => sex === SEX_MALE);

  const filteredPeopleByDiedMan = people
    .filter(({ sex, died }) => {
      return sex === SEX_MALE && Math.ceil(died / CENTURY_VALUE) === century;
    });

  const men = century
    ? filteredPeopleByDiedMan
    : filteredPeopleByMan;

  const ageDifferences = calculateAgeDifferences(men);
  const avgAgeOfMan = calculateAverageAge(ageDifferences);

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
  const womenFilter = people
    .filter(({ sex }) => sex === SEX_FEMALE);

  const womenFilterWithChild = womenFilter
    .filter(({ name }) => people.some(({ mother }) => mother === name));

  const selectedWomen = withChildren ? womenFilterWithChild : womenFilter;

  const ageDifferences = calculateAgeDifferences(selectedWomen);
  const avgAgeOfWomen = calculateAverageAge(ageDifferences);

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
  const childrensWithMoms = people
    .filter(({ mother }) => mother !== null);

  const menWithMoms = people
    .filter(({ mother, sex }) => mother !== null && sex === SEX_MALE);

  const childrens = onlyWithSon ? menWithMoms : childrensWithMoms;

  const ageDifferences = childrens.map(({ mother: motherName, born }) => {
    const mother = people.find(({ name }) => name === motherName);

    return mother ? born - mother.born : null;
  });

  const validAgeDifferences = ageDifferences.filter(el => el !== null);
  const averageAgeDifference = calculateAverageAge(validAgeDifferences);

  return averageAgeDifference;
};

function calculateAgeDifferences(people) {
  return people.map(({ died, born }) => died - born);
}

function calculateAverageAge(ageDifferences) {
  const totalAgeDifference = ageDifferences.reduce((acc, value) => acc + value);

  return totalAgeDifference / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

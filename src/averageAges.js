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
  const filterForMen = people.filter(
    person => person.sex === 'm' && (
      century === undefined || century === Math.ceil(person.died / 100)));

  const sum = filterForMen.reduce(
    (total, age) => total + (age.died - age.born), 0);

  const averageOfManAge = sum / filterForMen.length;

  return averageOfManAge;
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
  const filterForWomen = people.filter(
    person => person.sex === 'f' && (
      withChildren === undefined || (withChildren && people.some(
        child => child.mother === person.name))));

  const sum = filterForWomen.reduce(
    (total, age) => total + (age.died - age.born), 0);

  const averageOfWomenAge = filterForWomen.length > 0
    ? sum / filterForWomen.length
    : 0;

  return averageOfWomenAge;
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
  const differenceInAge = people.reduce((total, person) => {
    const findMother = people.find(m => m.name === person.mother);
    const filterForDifference = findMother && (!onlyWithSon || person.sex === 'm');

    if (filterForDifference) {
      const ageDifference = Math.abs(findMother.born - person.born);

      total.push(ageDifference);
    }

    return total;
  }, []);

  const totalAgeDifference = differenceInAge.reduce(
    (sum, difference) => sum + difference, 0);
  const averageAgeDifference = totalAgeDifference / differenceInAge.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

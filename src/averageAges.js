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

function sumAvarageAge(arr) {
  const sumOfAges = arr.reduce((sum, value) => {
    return sum + (value.died - value.born);
  }, 0) / arr.length;

  return sumOfAges;
}

function calculateMenAverageAge(people, century) {
  const inThisCenturyDied = person => century
  === Math.ceil(person.died / 100) && person.sex === 'm';

  const maleMen = person => person.sex === 'm';

  const maleMan = people.filter(
    century ? inThisCenturyDied : maleMen);

  return sumAvarageAge(maleMan);
}
/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const femaleMen = person => person.sex === 'f';

  const womenWithChild = person => person.sex === 'f'
    && people.some(human => human.mother === person.name);

  const femaleMan = people.filter(
    withChildren ? womenWithChild : femaleMen);

  return sumAvarageAge(femaleMan);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const allSons = person => person.sex === 'm'
    && people.some(woman => woman.name === person.mother);

  const allChildren = person => people.some(
    woman => woman.name === person.mother);

  const children = people.filter(
    onlyWithSon ? allSons : allChildren);

  const motherYears = children.map(child => {
    const mother = people.find(woman => child.mother === woman.name);

    return child.born - mother.born;
  });

  const allAges = motherYears.reduce((a, b) => a + b, 0) / motherYears.length;

  return allAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

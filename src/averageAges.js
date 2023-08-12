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
  // const men = !century
  //   ? people.filter(({ sex }) => sex === 'm')
  //   : people.filter(({ sex, died }) => sex === 'm'
  //   && Math.ceil(died / 100) === century);

  const men = people
    .filter(({ sex, died }) => (!century || Math.ceil(died / 100) === century)
    && sex === 'm');

  const menAverageAge = men.length !== 0 ? getAverageAge(men) : 0;

  return menAverageAge;
}

function getAverageAge(people) {
  return people
    .map(({ died, born }) => died - born)
    .reduce((prevAge, curAge) => prevAge + curAge) / people.length;
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

function isHaveChildren(people, womenName) {
  return people.find(person => person.mother === womenName);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people
    .filter(({ sex, name }) => (!withChildren || isHaveChildren(people, name))
    && sex === 'f');

  const womenAverageAge = women.length !== 0 ? getAverageAge(women) : 0;

  return womenAverageAge;
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
  const women = people.filter(({ sex }) => sex === 'f');

  const children = !onlyWithSon
    ? people.filter(({ mother }) => mother !== null)
    : people.filter(({ sex, mother }) => sex === 'm' && mother !== null);

  const ageDifferences = children
    .map(child => {
      const mother = women.find(woman => woman.name === child.mother);

      return mother ? child.born - mother.born : null;
    })
    .filter(diff => diff);

  const avAgeDiff = ageDifferences
    .reduce((sum, age) => sum + age) / ageDifferences.length;

  return avAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

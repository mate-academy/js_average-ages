'use strict';

const calculateAverageAge = (people) => (
  people.reduce((sum, person) => (
    sum + person.died - person.born), 0) / people.length);

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
  let menFilter = person => person.sex === 'm';

  if (century !== undefined) {
    menFilter = person => person.sex === 'm'
    && (Math.ceil(person.died / 100) === century);
  }

  const men = people.filter(menFilter);

  return calculateAverageAge(men);
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
  let womenFilter = person => person.sex === 'f';

  if (withChildren !== undefined) {
    womenFilter = woman => (woman.sex === 'f')
      && people.some(person => person.mother === woman.name);
  }

  const women = people.filter(womenFilter);

  return calculateAverageAge(women);
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
  let children = people.filter(person => person.mother !== 0
    && people.some(mother => mother.name === person.mother));

  if (onlyWithSon !== undefined) {
    children = children.filter(child => child.sex === 'm');
  };

  const mothers = (children.map(child =>
    people.find(mother => mother.name === child.mother)));

  const ageDiff = children.map((child, index) =>
    child.born - mothers[index].born);

  return ageDiff.reduce((a, b) => a + b, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

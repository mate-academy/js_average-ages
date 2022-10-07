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
  const mens = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'
  );
  const menAvgAge = mens.reduce(
    (acc, person) => acc + (person.died - person.born), 0) / mens.length;

  return menAvgAge;
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
  const womens = people.filter(person => withChildren
    ? people.some(children => children.mother === person.name)
    : person.sex === 'f'
  );
  const womenAvgAge = womens.reduce((acc, person) => acc + (
    person.died - person.born), 0) / womens.length;

  return womenAvgAge;
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
  // eslint-disable-next-line max-len
  const mothers = people.filter(person => people.some(
    children => children.mother === person.name));

  let ageSum = 0;
  let personCount = 0;

  if (onlyWithSon) {
    mothers.map(woman => people.map(person => {
      if (person.mother === woman.name && person.sex === 'm') {
        ageSum += person.born - woman.born;
        personCount++;
      }
    }));
  } else {
    mothers.map(woman => people.map(person => {
      if (person.mother === woman.name) {
        ageSum += person.born - woman.born;
        personCount++;
      }
    }));
  }

  return ageSum / personCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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

function averageAgeCalculator(numberOfPeople, ages) {
  return ages.reduce((a, b) => a + b, 0) / numberOfPeople;
}

function calculateMenAverageAge(people, century) {
  const filteredMans = century
    ? people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century
    )
    : people.filter(person => person.sex === 'm');

  const agesDifference = filteredMans.map(person => person.died - person.born);

  return averageAgeCalculator(filteredMans.length, agesDifference);
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
  const filteredWomen = withChildren
    ? people.filter(woman =>
      people.some(person => person.mother === woman.name
      ))
    : people.filter(person => person.sex === 'f');

  const agesDifference = filteredWomen.map(person => person.died - person.born);

  return averageAgeCalculator(filteredWomen.length, agesDifference);
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
  const children = onlyWithSon
    ? people.filter(child =>
      people.some(mom =>
        mom.name === child.mother && child.sex === 'm'
      ))
    : people.filter(child =>
      people.some(mom =>
        mom.name === child.mother
      ));

  const agesDifference = children.map(child =>
    child.born - people.find(mom => mom.name === child.mother).born);

  return averageAgeCalculator(agesDifference.length, agesDifference);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

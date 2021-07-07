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
  const menInArray = people.filter(elem => elem['sex'] === 'm').length;
  const menInArrayCent = people
    .filter(elem => elem['sex'] === 'm')
    .filter(elem => Math.ceil(elem['died'] / 100) === century).length;

  return arguments.length > 1 ? people
    .filter(elem => elem['sex'] === 'm')
    .filter(elem => Math.ceil(elem['died'] / 100) === century)
    .reduce((sum, elem) => elem['died'] - elem['born'] + sum, 0)
    / menInArrayCent : people
    .filter(elem => elem['sex'] === 'm')
    .reduce((sum, elem) => elem['died'] - elem['born'] + sum, 0)
    / menInArray;
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
  const womenInArray = people.filter(elem => elem['sex'] === 'f').length;
  const womenInArrayChild = people
    .filter(elem => elem['sex'] === 'f')
    .filter(elem => people
      .some(item => item['mother'] === elem['name'])).length;

  return withChildren ? people
    .filter(elem => elem['sex'] === 'f')
    .filter(elem => people.some(item => item['mother'] === elem['name']))
    .reduce((sum, elem) => elem['died'] - elem['born'] + sum, 0)
    / womenInArrayChild : people
    .filter(elem => elem['sex'] === 'f')
    .reduce((sum, elem) => elem['died'] - elem['born'] + sum, 0)
    / womenInArray;
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
  const agesDifference = [];

  if (onlyWithSon) {
    people
      .forEach(person => people
        .map(elem => {
          if (person.mother === elem.name && person.sex === 'm') {
            agesDifference.push(person.born - elem.born);
          }
        })
      );
  } else {
    people
      .forEach(person => people
        .map(elem => {
          if (person.mother === elem.name) {
            agesDifference.push(person.born - elem.born);
          }
        })
      );
  }

  return agesDifference
    .reduce((sum, elem) => sum + elem, 0) / agesDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

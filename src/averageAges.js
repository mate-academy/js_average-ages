'use strict';

function estimateAverageAge(filteredArray) {
  return filteredArray
    .map(person => person.died - person.born)
    .reduce((prev, curr) => prev + curr, 0)
    / filteredArray.length;
}

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
  const arrayOfMen = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
                    && Math.ceil(person.died / 100) === century);

  return estimateAverageAge(arrayOfMen);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const arrayOfWomen = withChildren
    ? people
      .filter(person => people.some(child => child.mother === person.name))
    : people
      .filter(person => person.sex === 'f');

  return estimateAverageAge(arrayOfWomen);
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
  const arrayOfChildren = onlyWithSon
    ? people
      .filter(child => people.some(woman => child.sex === 'm'
                                  && child.mother === woman.name))
    : people
      .filter(child => people.some(woman => child.mother === woman.name));

  const ageDifferences = arrayOfChildren
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born);

  return ageDifferences.reduce((prev, curr) => prev + curr, 0)
    / arrayOfChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

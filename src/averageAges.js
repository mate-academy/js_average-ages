'use strict';

function calculateAverage(total, length) {
  return +(total / length).toFixed(2);
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
  const men = people.filter(man => century
    ? Math.ceil(man.died / 100) === century && man.sex === 'm'
    : man.sex === 'm'
  );

  const totalAge = men
    .reduce((sum, curent) => sum + (curent.died - curent.born), 0);

  const averageAge = calculateAverage(totalAge, men.length);

  return averageAge;
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
  const women = people.filter(person => withChildren
    ? people.some(woman => person.name === woman.mother)
    : person.sex === 'f'
  );

  const totalAge = women
    .reduce((sum, curent) => sum + (curent.died - curent.born), 0);

  const averageAge = calculateAverage(totalAge, women.length);

  return averageAge;
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
  const children = people.filter(person => onlyWithSon
    ? people.some(mother => mother.name === person.mother) && person.sex === 'm'
    : people.some(mother => mother.name === person.mother)
  );

  const differenceList = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  const totalDifference = differenceList.reduce((sum, cur) => cur + sum, 0);

  const averageDiff = calculateAverage(totalDifference, differenceList.length);

  return averageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

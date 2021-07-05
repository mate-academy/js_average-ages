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
  const men = people.filter(person => person.sex === 'm');
  const averageMenAge = men
    .reduce((sum, person) => sum + person.died - person.born, 0) / men.length;

  const filteredMenByCentury = men
    .filter(person => Math.ceil(person.died / 100) === century);

  const averageMenAgeFiltered = filteredMenByCentury
    .reduce((sum, person) =>
      sum + person.died - person.born, 0) / filteredMenByCentury.length;

  return arguments.length === 1
    ? averageMenAge
    : averageMenAgeFiltered;
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
  const women = people.filter(person => person.sex === 'f');
  const averageWomenAge = women
    .reduce((sum, person) => sum + person.died - person.born, 0) / women.length;

  const filteredWomenByChildren = women
    .filter(person => people
      .find(elem => elem.mother === person.name));

  const averageWomenAgeFiltered = filteredWomenByChildren
    .reduce((sum, person) =>
      sum + person.died - person.born, 0) / filteredWomenByChildren.length;

  return arguments.length === 1
    ? averageWomenAge
    : averageWomenAgeFiltered;
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

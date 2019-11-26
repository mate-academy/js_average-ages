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
  const listOfMen = people.filter(
    person => person.sex === 'm'
      && (century === undefined
        ? true
        : Math.ceil(person.died / 100) === century));

  const listOfMenWithPropAge = listOfMen
    .map(
      person => {
        return {
          ...person,
          age: person.died - person.born,
        };
      }
    );

  let result = listOfMenWithPropAge
    .reduce(function(sum, currentPerson) {
      return { age: sum.age + currentPerson.age };
    });

  result = Object.values(result);

  return result / listOfMen.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const listOfWomen = people.filter(
    person => person.sex === 'f'
      && (withChildren === undefined
        ? true
        : people
          .some(woman => person.name === woman.mother)));

  const listOfWomenWithPropAge = listOfWomen
    .map(
      person => {
        return {
          ...person,
          age: person.died - person.born,
        };
      }
    );

  let result = listOfWomenWithPropAge
    .reduce(function(sum, currentPerson) {
      return { age: sum.age + currentPerson.age };
    });

  result = Object.values(result);

  return result / listOfWomen.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const listOfChildren = onlyWithSon
    ? people.filter(child => child.sex === 'm'
      && people.some(mother => mother.name === child.mother))
    : people.filter(child => people
      .some(mother => mother.name === child.mother));

  const differences = listOfChildren
    .map(
      child => child.born - people
        .find(
          mother => mother.name === child.mother
        ).born
    );

  return differences.reduce((sum, diff) => sum + diff, 0) / differences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

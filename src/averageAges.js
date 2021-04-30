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
  const menList = people.filter(person =>
    century
      ? (person.sex === 'm') && (Math.ceil(person.died / 100) === century)
      : (person.sex === 'm')
  );

  const averageAge = menList.reduce((accumulator, person) =>
    (accumulator + ((person.died - person.born) / menList.length)),
  0).toFixed(2);

  return +averageAge;
};
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
  const womanList = people.filter(person =>
    withChildren
      ? (person.sex === 'f')
        && (people.some(child => child.mother === person.name))
      : (person.sex === 'f')
  );

  const averageAge = womanList.reduce((accumulator, person) =>
    (accumulator + ((person.died - person.born) / womanList.length)),
  0).toFixed(2);

  return +averageAge;
};

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
  const childrenList = people.filter(person =>
    onlyWithSon
      ? (person.sex === 'm')
      && (people.some(mother => mother.name === person.mother))
      : (people.some(mother => mother.name === person.mother))
  );

  const ageDiff = childrenList.map(child =>
    child.born - people.find(mother =>
      mother.name === child.mother).born
  );

  const averageAgeDiff = ageDiff.reduce((accumulator, age) =>
    accumulator + age, 0) / ageDiff.length;

  return +averageAgeDiff;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

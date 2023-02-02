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

function averageAge(array) {
  const sumOfAges = array.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0);

  return sumOfAges / array.length;
}

function calculateMenAverageAge(people, century) {
  const menList = people.filter((person) => {
    return century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  return averageAge(menList);
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
  const womenList = people.filter(person => {
    return withChildren
      ? person.sex === 'f' && people.some(woman => woman.mother === person.name)
      : person.sex === 'f';
  });

  return averageAge(womenList);
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
  const childrenList = people.filter(person => {
    return onlyWithSon
      ? person.sex === 'm' && people.some(woman => person.mother === woman.name)
      : people.some(woman => person.mother === woman.name);
  });

  const sumOfAges = childrenList.reduce((sum, person) => {
    const mom = people.find(woman => person.mother === woman.name);

    return sum + (person.born - mom.born);
  }, 0);

  return sumOfAges / childrenList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

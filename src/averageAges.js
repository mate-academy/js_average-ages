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

function calculateTotalAge(humans) {
  return humans.reduce((acc, person) => acc + (person.died - person.born), 0);
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    if (person.sex === 'm') {
      if (!century) {
        return true;
      } else {
        return Math.ceil(person.died / 100) === century;
      }
    }

    return false;
  });

  const totalAge = calculateTotalAge(men);
  const averageAge = totalAge / men.length;

  return averageAge;
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
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women
      .filter(woman => people.some(person => person.mother === woman.name));
  }

  const totalAge = calculateTotalAge(women);
  const averageAge = totalAge / women.length;

  return averageAge;
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
  const womanList = people.filter(person => person.sex === 'f');
  const childrenList = people.filter(person => person.mother
    && womanList.some(mother => mother.name === person.mother));
  const sonsList = childrenList.filter(children => children.sex === 'm');

  const searchedList = onlyWithSon
    ? sonsList
    : childrenList;
  const averageAgeDiff = searchedList.reduce((acc, child) => (
    acc + child.born - womanList.find(mother => (
      mother.name === child.mother)).born
  ), 0) / searchedList.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

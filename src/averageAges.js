'use strict';

/**
 * create separate function
 */
function calculateTotalAge(people) {
  return people.reduce((total, person) =>
    total + (person.died - person.born), 0);
}

function filterPeople(people, condition) {
  return people.filter(person => {
    if (condition.sex && person.sex !== condition.sex) {
      return false;
    }

    if (condition.century
      && Math.ceil(person.died / 100) !== condition.century) {
      return false;
    }

    if (condition.withChildren
      && !people.some(parent => parent.mother === person.name)) {
      return false;
    }

    return true;
  });
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
  const men = filterPeople(people, {
    sex: 'm', century,
  });

  const totalAge = calculateTotalAge(men);

  return totalAge / men.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = filterPeople(people, {
    sex: 'f', withChildren,
  });

  const totalAge = calculateTotalAge(women);

  return totalAge / women.length;
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
  const family = onlyWithSon
    ? people.filter(person =>
      people.some(child => child.name === person.mother) && person.sex === 'm')
    : people.filter(person =>
      people.some(child => child.name === person.mother));

  const filterFamily = family.reduce((result, person) => {
    const mother = people.find(woman => woman.name === person.mother);

    return mother ? [...result, person.born - mother.born] : result;
  }, []);

  return filterFamily.reduce(
    (a, b) => a + b) / filterFamily.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

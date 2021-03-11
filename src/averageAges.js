'use strict';

// const people = require("./people");

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
  const filtered = (century)
    ? people.filter(person =>
      (Math.ceil(person.died / 100) === century) && (person.sex === 'm'))
    : people.filter(person => person.sex === 'm');

  return filtered.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / filtered.length;
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
  let filtered = people.filter(person => person.sex === 'f');

  function hasChild(person, index, array) {
    if (person.sex === 'f') {
      const name = person.name;

      return array.find(child => child.mother === name);
    }

    return false;
  }

  if (withChildren) {
    filtered = people.filter(hasChild);
  }

  return filtered.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / filtered.length;
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
  const relations = {};
  const women = people.filter(person => person.sex === 'f');

  women.forEach(woman => {
    relations[woman.name] = { born: woman.born };
  });

  let dateCounter = 0;
  let count = 0;

  for (const person of people) {
    if (onlyWithSon && person.sex !== 'm') {
      continue;
    }

    if (person.mother in relations) {
      dateCounter += (person.born - relations[person.mother].born);
      count++;
    }
  }

  return dateCounter / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

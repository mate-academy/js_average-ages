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
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(man =>
      Math.ceil(man.died / 100) === century);
  }

  return men.reduce((sum, man) =>
    sum + (man.died - man.born), 0
  ) / men.length;
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
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter(woman =>
      people.some(person => person.mother === woman.name));
  }

  return women.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0
  ) / women.length;
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
  const ageDiffs = [];

  if (onlyWithSon) {
    people.forEach(woman => people.map(person => {
      if (person.mother === woman.name && person.sex === 'm') {
        ageDiffs.push(person.born - woman.born);
      }
    }));
  } else {
    people.forEach(woman => people.map(person => {
      if (person.mother === woman.name) {
        ageDiffs.push(person.born - woman.born);
      }
    }));
  }

  return ageDiffs.reduce((sum, diff) => sum + diff, 0) / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

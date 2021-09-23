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

function averageAge(m) {
  return m.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / m.length;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter(p => p.sex === 'm');

  const menWhoDied = men.filter((m) => Math.ceil(m.died / 100) === century);

  return century ? averageAge(menWhoDied) : averageAge(men);
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
  const women = people.filter((p) => p.sex === 'f');
  const womenWithChild = women.filter((w) =>
    people.some((p) => p.mother === w.name));

  return withChildren
    ? averageAge(womenWithChild) : averageAge(women);
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
  const averageAgeDiffs = [];

  onlyWithSon ? (
    people.forEach(woman => people.map(person => {
      if (person.mother === woman.name && person.sex === 'm') {
        averageAgeDiffs.push(person.born - woman.born);
      }
    }))
  ) : (
    people.forEach(woman => people.map(person => {
      if (person.mother === woman.name) {
        averageAgeDiffs.push(person.born - woman.born);
      }
    }))
  );

  return averageAgeDiffs.reduce((sum, diff) =>
    sum + diff, 0) / averageAgeDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

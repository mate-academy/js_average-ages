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

  if (arguments.length > 1) {
    men = men.filter(man => century === Math.ceil(man.died / 100));
  }

  men = men.map(man => man.died - man.born);

  const result = parseFloat((men.reduce((acc, rec) => {
    return acc + rec;
  }) / men.length).toFixed(3));

  return result;
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
  let women = people.filter(person => person.sex === 'f');

  if (arguments.length > 1) {
    women = women.filter(woman => people
      .find(child => child.mother === woman.name));
  }

  women = women.map(woman => woman.died - woman.born);

  const result = parseFloat((women.reduce((acc, rec) => {
    return acc + rec;
  }) / women.length).toFixed(3));

  return result;
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
  let sum = 0;
  let counter = 0;
  const women = people.filter(person => person.sex === 'f');

  women.map(woman => people
    .map(child => {
      if (child.mother === woman.name) {
        if (arguments.length === 1 || child.sex === 'm') {
          sum += child.born - woman.born;
          counter++;
        }
      }
    }));

  return sum / counter;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

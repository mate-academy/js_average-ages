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
  let mens = people.filter(person => person.sex === 'm');

  if (century) {
    mens = mens.filter(men => Math.ceil(men.died / 100) === century);
  }

  const total = mens.reduce((sum, age) =>
    sum + (age.died - age.born),
  0
  );

  return total / mens.length;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const womens = people.filter((person) =>
    withChildren
      ? people.find((child) => child.mother === person.name) !== undefined
      : person.sex === 'f'
  );

  const total = womens.reduce(
    (sum, age) => sum + (age.died - age.born),
    0
  );

  return total / womens.length;
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
  const mothers = people.filter((person) =>
    onlyWithSon
      ? person.sex === 'm'
      && people.some((mother) => {
        if (person.mother === mother.name) {
          person['motherBorn'] = mother.born;

          return true;
        }
      })
      : people.some((mother) => {
        if (person.mother === mother.name) {
          person['motherBorn'] = mother.born;

          return true;
        }
      })
  );

  const total = mothers.reduce(
    (sum, age) => sum + (age.born - age.motherBorn),
    0
  );

  return total / mothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

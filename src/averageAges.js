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

// eslint-disable-next-line no-shadow
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter((person) => {
    return century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  const lifespan = men.reduce((sum, age) => {
    return sum + (age.died - age.born);
  }, 0);

  const averageAge = +(lifespan / men.length).toFixed(2);

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
function calculateWomenAverageAge(people, withChildren = false) {
  // write code here
  const female = people.filter((person) =>
    withChildren
      ? people.find((child) => child.mother === person.name) !== undefined
      : person.sex === 'f'
  );

  const lifespan = female.reduce((sum, age) => sum + (age.died - age.born), 0);

  const averageAge = +(lifespan / female.length).toFixed(2);

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
  // write code here
  const onlySon = people.filter((person) =>
    onlyWithSon
      ? person.sex === 'm'
        && people.some((mom) => {
          if (person.mother === mom.name) {
            person['motherBorn'] = mom.born;

            return true;
          }
        })
      : people.some((mom) => {
        if (person.mother === mom.name) {
          person['motherBorn'] = mom.born;

          return true;
        }
      })
  );

  const lifespan = onlySon.reduce(
    (sum, age) => sum + (age.born - age.motherBorn),
    0
  );

  const averageAge = +(lifespan / onlySon.length).toFixed(2);

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

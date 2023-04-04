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

// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

function calculateMenAverageAge(people, century) {
  let count = 0;

  const sumAge = people.reduce((prev, person) => {
    const personDiedCentury = Math.ceil(person.died / 100);
    const age = person.died - person.born;
    const checking = person.sex === 'm'
      && (personDiedCentury === century || !century);

    if (checking) {
      count++;

      return prev + age;
    }

    return prev;
  }, 0);

  return sumAge / count;
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
  let count = 0;

  const mothers = people.map((person) => {
    return person.mother;
  });

  const sumAge = people.reduce((prev, person) => {
    const age = person.died - person.born;
    const checkingSex = person.sex === 'f';
    const checkingChild = mothers.includes(person.name);

    if (checkingSex && withChildren && checkingChild) {
      count++;

      return prev + age;
    } else if (checkingSex && !withChildren) {
      count++;

      return prev + age;
    }

    return prev;
  }, 0);

  return sumAge / count;
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
  let count = 0;

  const childAndMoms = people.reduce((perv, child) => {
    return perv + people.reduce((prev, mom) => {
      if (child.mother === mom.name && onlyWithSon && child.sex === 'm') {
        const difference = child.born - mom.born;

        count++;

        return prev + (difference);
      }

      if (child.mother === mom.name && !onlyWithSon) {
        const difference = child.born - mom.born;

        count++;

        return prev + (difference);
      }

      return prev;
    }, 0);
  }, 0);

  return childAndMoms / count;

}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

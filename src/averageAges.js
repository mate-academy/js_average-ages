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
  let menOfOurCent = [];// all men of our century
  const men = people.filter((person) => {
    return person.sex === 'm';
  });
  let sum = 0;

  if (!century) {
    sum = men.reduce((prev, { born, died }) => prev + died - born, 0);

    return sum / men.length;
  }

  menOfOurCent = people.filter((person) => {
    return Math.ceil(person.died / 100) === century && person.sex === 'm';
  });

  sum = menOfOurCent.reduce((prev, { born, died }) => {
    return prev + died - born;
  }, 0);

  return sum / menOfOurCent.length;
  // learn how to use array methods like
  // filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  let mothersArr = [];
  const women = people.filter((person) => {
    return person.sex === 'f';
  });
  let sum = 0;
  // sum of ages of all women

  // if withChildren is not defined;

  if (!withChildren) {
    sum = women.reduce((prev, { born, died }) => prev + died - born, 0);

    return sum / women.length;
  }

  // if withChildren === true;

  mothersArr = women.filter((mother) => {
    return people.some((child) => mother.name === child.mother);
  }); // Array with all mother

  sum = mothersArr.reduce((prev, { born, died }) => prev + died - born, 0);
  // sum of ages of all women changed to sum of ages of all mothers

  return sum / mothersArr.length;
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
  const children = people.filter((child) => {
    return people.some(({ name }) => child.mother === name);
    // checking presence of the mother in the arr of people
  });
  const sons = children.filter((son) => {
    return son.sex === 'm';
  });

  if (onlyWithSon) {
    sum = sons.reduce((prev, { born, mother }) => {
      if (people.find(({ name }) => name === mother) !== undefined) {
        return prev + born - people.find(({ name }) => name === mother).born;
      }

      return prev;
    }, 0);

    return sum / sons.length;
  }

  sum = people.reduce((prev, { born, mother }) => {
    if (people.find(({ name }) => name === mother) !== undefined) {
      return prev + born - people.find(({ name }) => name === mother).born;
    }

    return prev;
  }, 0);

  return sum / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let allMan = [];

  arguments.length > 1
    ? allMan = people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : allMan = people.filter(person =>
      person.sex === 'm');

  const sumAge = allMan.reduce((prev, current,) =>
    (current.died - current.born) + prev, 0);

  return sumAge / allMan.length;
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
  let allWomen = [];

  arguments.length > 1
    ? allWomen = people.filter(person => {
      const result = people.findIndex(item => item.mother === person.name);

      return result !== -1;
    })
    : allWomen = people.filter(person => person.sex === 'f');

  const sumAge = allWomen.reduce((prev, current,) =>
    (current.died - current.born) + prev, 0);

  return sumAge / allWomen.length;
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
  let sumAge = 0;
  let peopleFilterArg = [];

  arguments.length > 1
    ? peopleFilterArg = people.filter(person => person.sex === 'm')
    : peopleFilterArg = [...people];

  let count = 0;

  sumAge = peopleFilterArg.reduce((prev, current) => {
    const findMotherIndex = people.findIndex(
      mother => mother.name === current.mother);

    if (findMotherIndex !== -1) {
      count++;

      return (current.born - people[findMotherIndex].born)
    + prev;
    } else {
      return prev;
    };
  }, 0);

  return sumAge / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const mans = people.filter(person => person.sex === 'm');

  if (century) {
    const mansRightAge = mans.filter(person =>
      Math.ceil(person.died / 100) === century);

    const newArr = mansRightAge.map((person) => person.died - person.born);

    const averageAge = newArr.reduce((sum, element) => sum + element, 0);

    return averageAge / newArr.length;
  } else {
    const newArr = mans.map((person) => person.died - person.born);

    const averageAge = newArr.reduce((sum, element) => sum + element, 0);

    return averageAge / newArr.length;
  }
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
  const womans = people.filter(person => person.sex === 'f');

  if (withChildren) {
    const mothers = [];

    for (const a of womans) {
      for (const b of people) {
        if (a.name === b.mother) {
          mothers.push(a);
          break;
        }
      }
    }

    const womansAge = mothers.map((person) => person.died - person.born);

    const averageAge = womansAge.reduce((sum, element) => sum + element, 0);

    return averageAge / womansAge.length;
  } else {
    const womansAge = womans.map((person) => person.died - person.born);

    const averageAge = womansAge.reduce((sum, element) => sum + element, 0);

    return averageAge / womansAge.length;
  }
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
  const womans = people.filter(person => person.sex === 'f');
  const sons = people.filter(person => person.sex === 'm');

  const mothers = [];

  if (onlyWithSon) {
    for (const a of womans) {
      for (const b of sons) {
        if (a.name === b.mother) {
          mothers.push(b.born - a.born);
        }
      }
    }

    const averageAge = mothers.reduce((sum, element) => sum + element, 0);

    return averageAge / mothers.length;
  } else {
    for (const a of womans) {
      for (const b of people) {
        if (a.name === b.mother) {
          mothers.push(b.born - a.born);
        }
      }
    }

    const averageAge = mothers.reduce((sum, element) => sum + element, 0);

    return averageAge / mothers.length;
  }
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

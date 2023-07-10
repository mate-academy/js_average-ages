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
  const filteredMen = people.filter((person) => {
    const isRightCentury = Math.ceil(person.died / 100) === century;
    const isMen = person.sex === 'm';

    return (!century || isRightCentury) && isMen;
  });

  return calculateAverageAge(filteredMen);
}

function calculateAverageAge(people) {
  const averageAge = people.reduce((sum, person) => {
    const age = person.died - person.born;

    return sum + age;
  }, 0);

  return averageAge / people.length;
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
  // write code here
  let filteredWomen = people.filter((person) => person.sex === 'f');

  if (withChildren) {
    filteredWomen = people.filter((person) => {
      return people.some((child) => {
        return child.mother === person.name;
      });
    });
  }

  return calculateAverageAge(filteredWomen);
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const filterChildren = people.filter((person) => {
    if (person.mother === null) {
      return false;
    }

    const motherExist = people.some((mother) => mother.name === person.mother);

    if (onlyWithSon) {
      return motherExist && person.sex === 'm';
    }

    return motherExist;
  });

  const ageDifference = filterChildren.map((child) => {
    const mother = people.find((person) => {
      return person.name === child.mother;
    });

    return child.born - mother.born;
  });

  return calculateAverageAgeDifference(ageDifference);
}

function calculateAverageAgeDifference(ageDiff) {
  const average = ageDiff.reduce((prev, age) => {
    return prev + age;
  }, 0);

  return average / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

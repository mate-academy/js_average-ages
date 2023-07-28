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
  let man = [];

  if (century === undefined) {
    man = people.filter(person => person.sex === 'm');
  } else {
    man = people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century);
  }

  const sum = man.reduce((prev, person) =>
    prev + (person.died - person.born), 0);

  return sum / man.length;
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
  let woman = [];

  if (withChildren === true) {
    woman = people.filter(person =>
      person.sex === 'f' && people.some(otherPerson =>
        otherPerson.mother === person.name));
  } else {
    woman = people.filter(person => person.sex === 'f');
  }

  const sum = woman.reduce((prev, person) =>
    prev + (person.died - person.born), 0);

  return sum / woman.length;
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
  let peopleArr = [];

  if (onlyWithSon === true) {
    peopleArr = people.filter(person => person.sex === 'm');
  } else {
    peopleArr = people;
  }

  const mothers = people.filter(mother =>
    mother.sex === 'f' && peopleArr.some(person =>
      person.mother === mother.name));

  const ageDifferences = mothers.flatMap(mother => {
    const children = peopleArr.filter(child => child.mother === mother.name);

    return children.map(child => child.born - mother.born);
  });

  return ageDifferences.reduce((prev, x) =>
    prev + x, 0) / ageDifferences.length;

  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

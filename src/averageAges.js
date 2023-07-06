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

  const men = people.filter(person =>
    person.sex === 'm' && (century === undefined
      || Math.ceil(person.died / 100) === century)
  );

  const menAgesSum = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const menCount = men.length;

  return menCount > 0 ? menAgesSum / menCount : 0;
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
  const women = people.filter(person =>
    person.sex === 'f' && (!withChildren || hasChildren(person, people))
  );

  const womenAgesSum = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const womenCount = women.length;

  return womenCount > 0 ? womenAgesSum / womenCount : 0;
}

function hasChildren(person, people) {
  return people.some(child => child.mother === person.name);
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

  const agesDiff = [];

  people.forEach(mother => {
    const children = people.filter(child =>
      child.mother === mother.name && (!onlyWithSon || child.sex === 'm'));

    children.forEach(child => {
      const ageDiff = child.born - mother.born;

      agesDiff.push(ageDiff);
    });
  });

  const sum = agesDiff.reduce((accumulator, currentValue) =>
    accumulator + currentValue, 0);

  const average = agesDiff.length > 0 ? sum / agesDiff.length : 0;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

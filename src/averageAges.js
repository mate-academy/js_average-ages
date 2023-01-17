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

function countAverage(numbers) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

// Use it to count age of person from array with people data.
// Output: array with ages;
function getAges(people) {
  return people.map(person => person.died - person.born);
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const onlyMen = people
    .filter(person => person.sex === 'm')
    .filter(person => !century || century === Math.ceil(person.died / 100));
  const ages = getAges(onlyMen);

  return countAverage(ages);
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
  const mothersList = people
    .map(person => person.mother)
    .filter(name => name !== null);

  const onlyWomen = people
    .filter((person) => person.sex === 'f')
    .filter((person) => !withChildren || mothersList.includes(person.name));
  const ages = getAges(onlyWomen);

  return countAverage(ages);
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
  const onlyChildren = people.filter((child) =>
    onlyWithSon
      ? people.find(
        (person) => child.mother === person.name && child.sex === 'm'
      )
      : people.find((person) => child.mother === person.name)
  );

  const differenceAges = onlyChildren
    .map(
      (child) =>
        child.born - people.find((mother) => mother.name === child.mother).born
    );
  const ages = countAverage(differenceAges);

  return ages;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

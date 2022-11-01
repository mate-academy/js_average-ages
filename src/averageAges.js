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
  const getMen = people.filter(person => person.sex === 'm');

  if (arguments.length === 1) {
    const calculateAge1 = getMen.map(person => person.died - person.born);
    const calculateAvgAge1 = calculateAge1.reduce((a, b) =>
      a + b, 0) / calculateAge1.length;

    return calculateAvgAge1;
  }

  const getCenturyOfDied = getMen.filter(person =>
    century === Math.ceil(person.died / 100));
  const calculateAge = getCenturyOfDied.map(person =>
    person.died - person.born);
  const calculateAvgAge = calculateAge.reduce((a, b) =>
    a + b, 0) / calculateAge.length;

  return calculateAvgAge;

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
  const getWomen = people.filter(person => person.sex === 'f');

  if (arguments.length === 1) {
    const calculateAge2 = getWomen.map(person =>
      person.died - person.born);
    const calculateAvgAge2 = calculateAge2.reduce((a, b) =>
      a + b, 0) / calculateAge2.length;

    return calculateAvgAge2;
  }

  const getWomenWithChildren = getWomen.filter(person =>
    people.some(child => child.mother === person.name));
  const calculateAge = getWomenWithChildren.map(person =>
    person.died - person.born);
  const calculateAvgAge = calculateAge.reduce((a, b) =>
    a + b, 0) / calculateAge.length;

  return calculateAvgAge;
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
  const womenAndChildren = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.find(mother => person.mother === mother.name))
    : people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const difference = womenAndChildren.map(child => (
    child.born - people.find(mother => child.mother === mother.name).born)
  );

  const calcDiff = difference.reduce((a, b) => a + b, 0) / difference.length;

  return calcDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const listOfMen = (century)
    ? people.filter(({ sex, died }) => sex === 'm'
      && Math.ceil(died / 100) === century)
    : people.filter(({ sex }) => sex === 'm');

  const ages = listOfMen.map(person => person.died - person.born);
  const sumAges = ages.reduce((prev, current) => prev + current, 0);
  const averageAgeOfMen = sumAges / ages.length;

  return averageAgeOfMen;
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
  const listOfWomen = (withChildren)
    ? people.filter(({ name }) => people.some(({ mother }) => mother === name))
    : people.filter(({ sex }) => sex === 'f');

  const ages = listOfWomen.map(person => person.died - person.born);
  const sumAges = ages.reduce((prev, current) => prev + current, 0);
  const averageAgeOfWomen = sumAges / ages.length;

  return averageAgeOfWomen;
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
  const listOfDifference = (onlyWithSon)
    ? people.filter(({ sex, mother: motherName }) => sex === 'm'
      && people.find(({ name }) => motherName === name))
    : people.filter(({ mother: motherName }) =>
      people.find(({ name }) => motherName === name));

  const ages = listOfDifference.map(({ born, mother }) =>
    born - people.find(({ name: motherName }) =>
      mother === motherName).born);

  const sumAges = ages.reduce((prev, current) => prev + current, 0);
  const averageAgeOfDifference = sumAges / ages.length;

  return averageAgeOfDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

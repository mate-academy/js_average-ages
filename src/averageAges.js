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

  let malesAverageAge = people.filter((person) => person.sex === 'm');

  malesAverageAge = century !== undefined
    ? malesAverageAge.filter(
      (person) => Math.ceil(person.died / 100) === century
    )
    : malesAverageAge;

  return malesAverageAge.reduce(
    (accumulator, currentPerson) =>
      accumulator + (currentPerson.died - currentPerson.born), 0
  ) / malesAverageAge.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withkids` is
 * specified then function calculates average age only for women with kids
 *
 * Hint: To check if a woman has kids you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withkids - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withkids) {
  // write code here
  let femalesAverageAge = people.filter((person) => person.sex === 'f');
  const notMotherless = people.filter((person) => person.mother !== null);

  femalesAverageAge = withkids === true
    ? femalesAverageAge.filter(
      (person) => notMotherless.some((son) => son.mother === person.name))
    : femalesAverageAge;

  return femalesAverageAge.reduce(
    (accumulator, currentPerson) =>
      accumulator + (currentPerson.died - currentPerson.born), 0
  ) / femalesAverageAge.length;
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
  const mothers = new Set(people.map(person => person.name));

  const kids = onlyWithSon
    ? people.filter(child => child.sex === 'm'
    && mothers.has(child.mother))
    : people.filter(child => mothers.has(child.mother));

  const difference = kids.map(
    child => child.born - people.find(
      mother => mother.name === child.mother).born
  );

  return difference.reduce(
    (sumOfAges, current) => sumOfAges + current
  ) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

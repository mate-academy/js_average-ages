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
  const mensArray = century
    ? people.filter((person) =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter((person) => person.sex === 'm');

  return calculateAverageAge(mensArray);
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
  const womenArray = withChildren
    ? people.filter(person =>
      people.find(child => child.mother === person.name) && person.sex === 'f')
    : people.filter(person => person.sex === 'f');

  return calculateAverageAge(womenArray);
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
  const childArray = onlyWithSon
    ? people.filter((person) => person.mother !== null && person.sex === 'm')
    : people.filter((person) => person.mother !== null);

  const ageDiff = childArray
    .map((child) => {
      const mother = people.find((person) => person.name === child.mother);

      return mother ? child.born - mother.born : null;
    })
    .filter((diff) => diff !== null);

  return ageDiff.reduce((acc, el) => acc + el, 0) / ageDiff.length;
}

function calculateAverageAge(array) {
  const ageCalc = array.map((person) => person.died - person.born);
  const averageAge = ageCalc
    .reduce((prev, age) => prev + age, 0) / ageCalc.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

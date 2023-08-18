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
  let men = people.filter(person => person.sex === 'm');

  men = (century !== undefined)
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  const totalMen = men.length;
  const totalAge = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return totalAge / totalMen;
}
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
function calculateWomenAverageAge(peopleArray, withChildren) {
  let women = peopleArray.filter(person => person.sex === 'f');

  women = (withChildren)
    ? women.filter(woman =>
      peopleArray.some(person => person.mother === woman.name)
    )
    : women;

  const totalWomen = women.length;
  const totalAge = women.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0);

  return totalAge / totalWomen;
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
  let haveMothers = [];

  if (onlyWithSon) {
    haveMothers = people.filter(person => person.mother
    && person.sex === 'm');
  } else {
    haveMothers = people.filter(person => person.mother);
  }

  const ageDifferences = [];

  for (const person of haveMothers) {
    const mother = people.find(woman => woman.name === person.mother);

    if (mother) {
      ageDifferences.push(person.born - mother.born);
    }
  }

  const sum = ageDifferences.reduce((accumulator, difference) =>
    accumulator + difference, 0);

  return sum / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

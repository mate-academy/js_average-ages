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
function calculateMenAverageAge(people, century = null) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let men = people.filter((person) => person.sex === 'm');

  if (century !== null) {
    men = men.filter((person) => Math.ceil(person.died / 100) === century);
  }

  const totalAge = men.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );

  const averageAge = totalAge / men.length;

  return averageAge;
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
function calculateWomenAverageAge(people, withChildren = null) {
  // write code here

  let women = people.filter((person) => person.sex === 'f');

  if (withChildren !== null) {
    women = people
      .filter(person => people
        .some((child) => child.mother === person.name));
  }

  const totalAge = women.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );
  const averageAge = totalAge / women.length;

  return averageAge;
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm' && person.mother !== null)
    : people.filter(person => person.mother !== null);

  const ageDiffs = filteredPeople.map(person => {
    const mother = people.find(p => p.name === person.mother);

    if (mother && mother.born) {
      return person.born - mother.born;
    }

    return null;
  });

  const validAgeDiffs = ageDiffs.filter(ageDiff => ageDiff !== null);
  const totalAgeDiff = validAgeDiffs.reduce((sum, ageDiff) => sum + ageDiff, 0);
  const averageAgeDiff = totalAgeDiff / validAgeDiffs.length || 0;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

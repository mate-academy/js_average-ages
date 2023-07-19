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
 *
 */
function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => Math.ceil(person.died / 100) === century
    && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  return men.length === 0 ? 0 : men.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  ) / men.length;

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
  const women = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(p => p.mother === person.name))
    : people.filter(person => person.sex === 'f');

  if (women.length === 0) {
    return 0;
  }

  const totalAge = women.reduce(
    (sum, person) => sum + (person.died - person.born), 0
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
  const ageDiffs = onlyWithSon
    ? people
      .filter(person => person.sex === 'm' && person.mother)
      .map(son => {
        const mother = people.find(person => person.name === son.mother);

        return mother ? son.born - mother.born : null;
      })
      .filter(ageDiff => ageDiff !== null)
    : people
      .filter(person => person.mother)
      .map(person => {
        const mother = people.find(p => p.name === person.mother);

        return mother ? person.born - mother.born : null;
      })
      .filter(ageDiff => ageDiff !== null);

  if (ageDiffs.length === 0) {
    return 0;
  }

  const totalDiff = ageDiffs.reduce((sum, ageDiff) => sum + ageDiff, 0);
  const averageDiff = totalDiff / ageDiffs.length;

  return averageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

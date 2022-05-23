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
  const males = century
    ? people.filter(person => Math.ceil(person.died / 100) === century
      && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const ageTotal = males
    .reduce((sum, male) => sum + (male.died - male.born), 0);

  return ageTotal / males.length;
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
  const females = withChildren
    ? people.filter(person => people.some(p => p.mother === person.name)
      && person.sex === 'f')
    : people.filter(person => person.sex === 'f');

  const ageTotal = females
    .reduce((sum, female) => sum + (female.died - female.born), 0);

  return ageTotal / females.length;
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
  const ageDiffs = people.reduce((result, person) => {
    if (onlyWithSon && person.sex === 'f') {
      return result;
    }

    const mother = person.mother
      && people.find(p => p.name === person.mother);

    if (mother) {
      result.push(person.born - mother.born);
    }

    return result;
  }, []);

  const ageDiffsTotal = ageDiffs
    .reduce((sum, ageDiff) => sum + ageDiff, 0);

  return ageDiffsTotal / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

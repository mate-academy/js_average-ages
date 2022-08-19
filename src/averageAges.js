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
  const mans = !century

    ? people.filter(person => person.sex === 'm')

    : people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  return mans.map(calculateAge)
    .reduce((sum, current) => (sum + current), 0) / mans.length;
}

const calculateAge = (everyPerson) => {
  return everyPerson.died - everyPerson.born;
};

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
  const women = !withChildren

    ? people.filter(person => person.sex === 'f')

    : people.filter(person => person.sex === 'f'
      && people.some(children => children.mother === person.name));

  return women.map(calculateAge)
    .reduce((sum, current) => (sum + current), 0) / women.length;
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
  const children = !onlyWithSon

    ? people
      .filter(person => people
        .some(woman => woman.name === person.mother))

    : people
      .filter(person => people
        .some(woman => woman.name === person.mother)
        && person.sex === 'm');

  const agesDiff = children
    .map(child => (child.born - people
      .find(woman => child.mother === woman.name).born));

  const averageAgeDiff = agesDiff
    .reduce((sum, age) => (sum + age), 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

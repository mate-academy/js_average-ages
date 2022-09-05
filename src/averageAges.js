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
  const mensList = arguments.length < 2
    ? people.filter(({ sex }) => sex === 'm')
    : people.filter(({ sex, died }) =>
      sex === 'm' && Math.ceil(died / 100) === century);

  const sumOfYears = mensList.reduce((sum, { died, born }) =>
    sum + (died - born), 0);

  return sumOfYears / mensList.length;
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
  const mothersList = people.map(({ mother }) => mother);
  const womensList = withChildren
    ? people.filter(({ sex, name }) =>
      sex === 'f' && mothersList.includes(name))
    : people.filter(({ sex }) => sex === 'f');

  const sumOfYears = womensList
    .reduce((sum, { died, born }) => sum + (died - born), 0);

  return sumOfYears / womensList.length;
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
  const peoplesNames = people.map(({ name }) => name);
  const childrensList = onlyWithSon
    ? people.filter(({ sex, mother }) =>
      sex === 'm' && peoplesNames.includes(mother))
    : people.filter(({ mother }) => peoplesNames.includes(mother));
  const sumOfDiff = childrensList.reduce(getSumOfDiff, 0);

  function getSumOfDiff(prev, person) {
    const motherOfPerson = people.find(({ name }) => name === person.mother);
    let sum = prev;

    sum += person.born - motherOfPerson.born;

    return sum;
  }

  return sumOfDiff / childrensList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

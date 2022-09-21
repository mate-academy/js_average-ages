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

function calculateAverageAge(fiteredList) {
  return fiteredList.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / fiteredList.length;
}

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return calculateAverageAge(men);
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
  const female = withChildren
    ? people.filter(person =>
      people.map(human => human.mother).includes(person.name))
    : people.filter(person => person.sex === 'f');

  return calculateAverageAge(female);
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
  const mothers = people.filter(person =>
    people.map(human => human.mother).includes(person.name));

  const children = onlyWithSon
    ? people.filter(person =>
      people.map(human => human.name).includes(person.mother)
      && person.sex === 'm')
    : people.filter(person =>
      people.map(human => human.name).includes(person.mother));

  const ageDifference = [];

  children.forEach((child) => {
    const mother = mothers
      .find(women => women.name === child.mother);

    if (mother) {
      ageDifference.push(child.born - mother.born);
    }
  });

  const averageDifference = ageDifference
    .reduce((sum, difference) =>
      sum + difference, 0) / ageDifference.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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

function calculateAverage(list) {
  const sum = list.reduce((sumPrev, person) => {
    const PERSON_AGE = person.died - person.born;

    return sumPrev + PERSON_AGE;
  }, 0);

  return sum / list.length;
}

function calculateMenAverageAge(people, century) {
  const men = century ? people.filter((person) =>
    Math.ceil(person.died / 100) === century && person.sex === 'm')
    : people.filter((person) => person.sex === 'm');

  return calculateAverage(men);
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
    ? people.filter((person) => person.sex === 'f'
    && people.some((otherPerson) => otherPerson.mother === person.name))
    : people.filter((person) => person.sex === 'f');

  return calculateAverage(women);
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
  const peopleWithMother = onlyWithSon
    ? people.filter(person => person.mother
      && person.sex === 'm'
      && people.some(woman => woman.name === person.mother))
    : people.filter(person => person.mother
      && people.some(woman => woman.name === person.mother));

  const agesDiffListt = peopleWithMother.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return agesDiffListt.reduce((sumPrev, number) =>
    sumPrev + number, 0) / agesDiffListt.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

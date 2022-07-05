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
  const agesList = (century
    ? people.filter(({ sex, died }) => sex === 'm'
      && Math.ceil(died / 100) === century)
    : people.filter(({ sex }) => sex === 'm'))
    .map(person => {
      return person.died - person.born;
    });

  return Math.round(
    agesList.reduce((a, b) => (a + b), 0) / agesList.length * 100
  ) / 100;
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
  const agesList = (withChildren
    ? people.filter(
      ({ name }) => people.some(({ mother }) => mother === name))
    : people.filter(({ sex }) => sex === 'f'))
    .map(person => {
      return person.died - person.born;
    });

  return Math.round(
    agesList.reduce((a, b) => (a + b), 0) / agesList.length * 100
  ) / 100;
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
  const children = onlyWithSon
    ? people.filter(person => {
      return people.some(mother => person.mother === mother.name)
      && person.sex === 'm';
    })
    : people.filter(person => {
      return people.some(mother => person.mother === mother.name);
    });

  const conditions = person => {
    const motherIndex = people.findIndex(
      mother => person.mother === mother.name
    );

    return person.born - people[motherIndex].born;
  };

  const agesList = children.map(conditions).filter(el => el !== undefined);

  return Math.round(
    agesList.reduce((a, b) => (a + b), 0) / agesList.length * 100
  ) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

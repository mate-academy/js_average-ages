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
  const filterPeople = people.filter(({ sex, died }) => {
    return (sex === 'm'
    && (century === undefined || century === Math.ceil(died / 100)));
  });

  const menAverageAge = filterPeople.reduce((sum, person) => {
    return sum + person.died - person.born;
  }, 0) / filterPeople.length;

  return menAverageAge;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const filterPeople = people.filter(({ name, sex }) => {
    return (sex === 'f'
    && (!withChildren || people.some((person) => person.mother === name)));
  });

  const womenAverageAge = filterPeople.reduce((sum, person) => {
    return sum + person.died - person.born;
  }, 0) / filterPeople.length;

  return womenAverageAge;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const filterSons = people.filter(({ mother, sex }) => {
    return (mother !== null
    && (!onlyWithSon || sex === 'm'));
  });

  const ageDiff = filterSons.map((son) => {
    const mother = people.find((person) => son.mother === person.name);

    return mother ? son.born - mother.born : null;
  }).filter((elemet) => elemet != null);

  const averageAgeDiff = ageDiff.reduce((sum, current) => {
    return sum + current;
  }, 0) / ageDiff.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

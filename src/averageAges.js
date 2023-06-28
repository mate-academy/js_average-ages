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
 @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filter = people.filter((person) => (century
    ? Math.ceil(person.died / 100) === century
    && person.sex === 'm' : person.sex === 'm'));
  const mapped = filter.map((person) => person.died - person.born);

  return mapped.reduce((prev, acc) => acc + prev) / mapped.length;
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
  const filter = people.filter((person) => (withChildren
    ? people.find((child) => child.mother === person.name)
    && person.sex === 'f'
    : person.sex === 'f'));

  const mapped = filter.map((person) => person.died - person.born);

  return mapped.reduce((prev, acc) => acc + prev) / mapped.length;
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
  const hasMother = people.filter(child => {
    const mother = people.find(person => person.name === child.mother);

    return mother && (onlyWithSon ? child.sex === 'm' : true);
  });

  const ageDiff = hasMother.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const sum = ageDiff.reduce((a, b) => a + b, 0);

  const average = sum / ageDiff.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
function calculateAverageAge(people) {
  return people.reduce(
    (sum, { died, born }) => sum + died - born, 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const findMen = people.filter(({ sex, died }) => sex === 'm' && (
    century
      ? Math.ceil(died / 100) === century
      : true
  )
  );

  const averageAge = calculateAverageAge(findMen);

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
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const findWomen = people.filter(
    person => person.sex === 'f' && (
      withChildren
        ? people.some(p => p.mother === person.name)
        : true
    ));
  const averageAge = calculateAverageAge(findWomen);

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
  const mothers = people.filter(person => person.sex === 'f' && (
    ({ name }) => people.some(({ mother }) => mother === name)));

  const children = people.filter(
    ({ mother, sex }) => {
      return mothers.some(
        ({ name }) => mother === name) && (!onlyWithSon || sex === 'm');
    });

  const find = children.map(child => {
    const foundMom = mothers.find(mom => mom.name === child.mother);

    return foundMom ? child.born - foundMom.born : null;
  }).filter(value => value);

  const difference = find.reduce(
    (sum, dif) => sum + dif) / find.length;

  return difference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

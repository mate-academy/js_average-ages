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
  const filteredPeople = century
    ? people.filter(person => (Math.ceil(person.died / 100) === century)
    && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  return findListAverage(filteredPeople);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map(person => person.mother);
  const filteredPeople = withChildren
    ? people.filter(person => mothers.includes(person.name))
    : people.filter(person => person.sex === 'f');

  return findListAverage(filteredPeople);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let mothersNumber = 0;
  const result = people.reduce((differenceSum, child) => {
    const mother = people.find(person => person.name === child.mother);

    if (mother && (!onlyWithSon || child.sex === 'm')) {
      mothersNumber++;

      return differenceSum + (child.born - mother.born);
    }

    return differenceSum;
  }, 0);

  return result / mothersNumber;
}

function findListAverage(people) {
  return people.reduce(
    (acc, person) =>
      acc + (person.died - person.born),
    0) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

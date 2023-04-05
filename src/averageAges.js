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
  const men = people.filter(person =>
    person.sex === 'm'
    && (century ? Math.ceil(person.died / 100) === century : true)
  );

  return calculateAverageAge(men);
}

function calculateAverageAge(people) {
  const sumOfAges = people.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return sumOfAges / people.length;
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
    ? people.filter(woman => woman.sex
      === 'f' && people.some(person => person.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');
  const sumOfAges
  = women.reduce((sum, person) => sum + (person.died - person.born), 0);

  return sumOfAges / women.length;
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
  const filteredPeople = onlyWithSon
    ? people.filter(p => p.sex === 'm')
    : people;
  const ageSum = filteredPeople.reduce((sum, person) => {
    const mother = people.find(p => p.name === person.mother);

    if (!mother) {
      return sum;
    }

    const ageDiff = person.born - mother.born;

    return sum + ageDiff;
  }, 0);
  const motherCount = filteredPeople.reduce((count, person) => {
    const mother = people.find(p => p.name === person.mother);

    return mother ? count + 1 : count;
  }, 0);
  const averageAgeDiff = ageSum / motherCount;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

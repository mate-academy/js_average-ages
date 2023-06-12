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
  const men = people.filter(person => person.sex === 'm');
  const menForCalculation = century ? men.filter(person =>
    Math.ceil(person.died / 100) === century) : men;

  const totalAge = menForCalculation.reduce((sum, person) =>
    sum + (person.died - person.born), 0);
  const averageAge = totalAge / menForCalculation.length;

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
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const womenForCalculation = withChildren
    ? women.filter(woman => hasChildren(woman, people)) : women;

  const totalAge = womenForCalculation.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const averageAge = totalAge / womenForCalculation.length;

  return averageAge;
}

function hasChildren(woman, people) {
  return people.some(person => person.mother === woman.name);
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm') : people;

  let numPairs = 0;

  const totalAgeDiff = filteredPeople.reduce((sum, person) => {
    const mother = people.find(women => women.name === person.mother);

    if (mother) {
      const ageDiff = person.born - mother.born;

      numPairs++;

      return sum + ageDiff;
    }

    return sum;
  }, 0);

  return totalAgeDiff / numPairs;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

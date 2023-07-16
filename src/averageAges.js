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

  const filteredMen = century ? men.filter(
    person => Math.ceil(person.died / 100) === century
  ) : men;

  const averageAge = filteredMen.length ? filteredMen.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  ) / filteredMen.length : 0;

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

  const filteredWomen = withChildren ? women.filter(
    woman => people.some(person => person.mother === woman.name)
  ) : women;

  return filteredWomen.reduce(
    (sum, woman) => sum + (woman.died - woman.born), 0
  ) / filteredWomen.length;
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
  const filteredPeople = people.filter(person => onlyWithSon
    ? person.sex === 'm'
    && person.mother !== null : person.mother !== null);

  const totalAgeDiff = filteredPeople.reduce((sum, person) => {
    const mother = people.find(p => p.name === person.mother);

    if (mother && mother.born) {
      return sum + (person.born - mother.born);
    }

    return sum;
  }, 0);

  const validPeopleCount = filteredPeople.reduce((count, person) => {
    const mother = people.find(p => p.name === person.mother);

    return count + (mother && mother.born ? 1 : 0);
  }, 0);

  return validPeopleCount > 0 ? totalAgeDiff / validPeopleCount : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

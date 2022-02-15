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
  const filteredPeople = people.filter(person => {
    return century
      ? person.sex === 'm' && century === Math.ceil(person.died / 100)
      : person.sex === 'm';
  });

  const averageMenAge = filteredPeople.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / filteredPeople.length;

  return averageMenAge;
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
  function isMother(woman) {
    return people.some(person => person.mother === woman.name);
  }

  const women = people.filter((person) => {
    return withChildren
      ? person.sex === 'f' && isMother(person)
      : person.sex === 'f';
  });

  const averageWomenAge = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / women.length;

  return averageWomenAge;
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
  function isMother(woman) {
    return onlyWithSon
      ? people.some(person => person.sex === 'm'
      && person.mother === woman.name)
      : people.some(person => person.mother === woman.name);
  }

  function findChildBirthYear(woman) {
    const sons = people.filter(person =>
      person.mother === woman.name && person.sex === 'm');

    const children = people.filter(person =>
      person.mother === woman.name);

    return onlyWithSon
      ? sons.map(child => child.born)
      : children.map(child => child.born);
  }

  const mothers = people.filter(person => {
    return person.sex === 'f' && isMother(person);
  });

  const countBirths = [];

  mothers.map(woman => {
    return findChildBirthYear(woman).length > 1
      ? findChildBirthYear(woman).forEach(kid =>
        countBirths.push(kid - woman.born))
      : countBirths.push(findChildBirthYear(woman) - woman.born);
  });

  const averageBirthAge = countBirths.reduce((sum, year) =>
    sum + year, 0) / countBirths.length;

  return averageBirthAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

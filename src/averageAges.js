'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100:
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century = null) {
  let filteredPeople = people;

  if (century) {
    filteredPeople = people.filter(person => {
      const personCentury = Math.ceil(person.died / 100);

      return personCentury === century;
    });
  }

  const men = filteredPeople.filter(person => person.sex === 'm');

  const sumAges = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);
  const averageAge = sumAges / men.length;

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
function calculateWomenAverageAge(people, withChildren = false) {
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter(woman => {
      return people.some(person => person.mother === woman.name);
    });
  }

  const totalAge = women.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0);
  const averageAge = totalAge / women.length;

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
function calculateAverageAgeDiff(people, onlyWithSon = null) {
  const women = people.filter(person => person.sex === 'f');
  let children = people.filter(child => people.some(person =>
    child.mother === person.name));

  if (onlyWithSon) {
    children = children.filter(child => {
      return women.find(woman =>
        woman.name === child.mother) && child.sex === 'm';
    });
  }

  const ageDiffs = women.map(woman => {
    const findChildren = children.filter(child =>
      child.mother === woman.name);

    return findChildren.map(child => child.born - woman.born);
  }).reduce((acc, curr) => acc.concat(curr), []);

  const sum = ageDiffs.reduce((total, ageDiff) => total + ageDiff, 0);
  const average = sum / ageDiffs.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

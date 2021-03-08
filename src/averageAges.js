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
  const men = people.filter((person) => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  return getAvarage(getAges(men));
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
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && isMother(person)
    : person.sex === 'f');

  function isMother(woman) {
    return people.find(person => person.mother === woman.name);
  }

  return getAvarage(getAges(women));
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age diference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age diference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredPeople = people.filter(person => onlyWithSon
    ? person.sex === 'm' && hasMother(person)
    : hasMother(person));

  function hasMother(child) {
    const mother = people.find(person => child.mother === person.name);

    return mother !== undefined;
  }

  function findMotherOfChild(child) {
    return people.find(person => child.mother === person.name);
  }

  const diferences = filteredPeople.map(person =>
    person.born - findMotherOfChild(person).born);

  return getAvarage(diferences);
}

function getAvarage(arrayOfNumbers) {
  return Math.round(arrayOfNumbers.reduce(
    (a, b) => a + b) / arrayOfNumbers.length * 100) / 100;
}

function getAges(arrayOfPeople) {
  return arrayOfPeople.map(person => person.died - person.born);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

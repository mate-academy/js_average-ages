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
  // write code here
  const personsFiltered = people.filter(person => person.sex === 'm');

  const personsFilteredWithCentury = personsFiltered
    .filter(person => Math.ceil(person.died / 100) === century);

  const listOfMens = century !== undefined
    ? personsFilteredWithCentury
    : personsFiltered;

  const listOfAges = listOfMens.map(person => person.died - person.born);

  const sumOfAges = listOfAges.reduce((prev, item) => prev + item, 0);

  return sumOfAges / listOfAges.length;
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
  // write code here
  const personsFiltered = people.filter(person => person.sex === 'f');

  const personsFilteredWithChildren = people
    .filter(person => people
      .find(children => person.name === children.mother));

  const listOfWomen = withChildren !== undefined
    ? personsFilteredWithChildren
    : personsFiltered;

  const listOfAges = listOfWomen
    .map(person => person.died - person.born);

  const sumOfAges = listOfAges.reduce((prev, item) => prev + item, 0);

  return sumOfAges / listOfAges.length;
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
  // write code here
  const mothersFiltered = people
    .filter(person => people
      .find(children => person.name === children.mother));

  const mothersFilteredWithSon = people
    .filter(person => people
      .find(child => person.name === child.mother && child.sex === 'm'));

  const childrenFiltered = people
    .filter(person => people
      .find(mother => person.mother === mother.name));

  const sonsFiltered = people
    .filter(person => people
      .find(mother => person.mother === mother.name) && person.sex === 'm');

  const listOfMothers = onlyWithSon !== undefined
    ? mothersFilteredWithSon
    : mothersFiltered;

  const listOfChildren = onlyWithSon !== undefined
    ? sonsFiltered
    : childrenFiltered;

  const listOfAges = listOfChildren
    .map(child => child.born - listOfMothers
      .find(mother => mother.name === child.mother).born);

  const sumOfAges = listOfAges.reduce((prev, item) => prev + item, 0);

  return sumOfAges / listOfChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

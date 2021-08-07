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
function calculateMenAverageAge(people, century = 0) {
  // write code here
  const getData = people.filter(person => person.sex === 'm');

  const getDataWithCentury = people.filter(person =>
    Math.ceil(person.died / 100) === 18 && person.sex === 'm');

  const getListOfMens = century !== 0 ? getDataWithCentury : getData;

  const getListOfAges = getListOfMens.map(person => person.died - person.born);

  const sumOfAges = getListOfAges.reduce((prev, item) => prev + item, 0);

  return sumOfAges / getListOfAges.length;
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
function calculateWomenAverageAge(people, withChildren = 0) {
  // write code here
  const getData = people.filter(person => person.sex === 'f');

  const getDataWithChildren = people.filter(person =>
    people.find(children =>
      person.name === children.mother));

  const getListOfWomans = withChildren !== 0 ? getDataWithChildren : getData;

  const getListOfAges = getListOfWomans.map(person =>
    person.died - person.born);

  const sumOfAges = getListOfAges.reduce((prev, item) => prev + item, 0);

  return sumOfAges / getListOfAges.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = 0) {
  // write code here
  const getDataOfMothers = people.filter(person =>
    people.find(children =>
      person.name === children.mother));

  const getDataOfMothersWithSon = people.filter(person =>
    people.find(children =>
      person.name === children.mother && children.sex === 'm'));

  const getDataOfAllChildren = people.filter(person =>
    people.find(mother =>
      person.mother === mother.name));

  const getDataOfSon = people.filter(person =>
    people.find(mother =>
      person.mother === mother.name) && person.sex === 'm');

  const getListOfMothers = onlyWithSon !== 0
    ? getDataOfMothersWithSon
    : getDataOfMothers;

  const getListOfChildren = onlyWithSon !== 0
    ? getDataOfSon
    : getDataOfAllChildren;

  const getListOfAges = getListOfChildren.map(children =>
    children.born - getListOfMothers.find(mother =>
      mother.name === children.mother).born);

  const sumOfAges = getListOfAges.reduce((prev, item) => prev + item, 0);

  return sumOfAges / getListOfChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

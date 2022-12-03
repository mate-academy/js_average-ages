'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = getPeopleBySex(people, 'm');
  const withCentury = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  return getAverageAge(withCentury);
}

function getPeopleBySex(people, sex) {
  const peopleBySex = people.filter(person => person.sex === sex);

  return peopleBySex;
}

function getAverageAge(people) {
  const sumOfAges = people
    .map(person => person.died - person.born)
    .reduce((prev, curr) => prev + curr);

  return sumOfAges / people.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = getPeopleBySex(people, 'f');
  const hasChildren = withChildren
    ? women.filter(woman => (
      people.find(person => woman.name === person.mother)
    ))
    : women;

  return getAverageAge(hasChildren);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => (
    people.find(person => person.name === child.mother)
  ));

  const hasOnlySon = onlyWithSon
    ? getPeopleBySex(children, 'm')
    : children;

  const sumOfDifferences = hasOnlySon.reduce((sum, son) => {
    return sum + son.born
      - people.find(person => person.name === son.mother).born;
  }, 0);

  return sumOfDifferences / hasOnlySon.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

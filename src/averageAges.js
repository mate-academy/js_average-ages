'use strict';

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menAverageAge = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  const age = menAverageAge.map(person => person.died - person.born);

  return calculateAverage(age);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenAverageAge = people.filter(person =>
    withChildren
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f');

  const age = womenAverageAge.map(person => person.died - person.born);

  return calculateAverage(age);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const hasMother = people.filter(person => people.some(mother => (
    onlyWithSon
      ? person.sex === 'm' && mother.name === person.mother
      : mother.name === person.mother
  )));

  const averageAgeDiff = hasMother.map(person => {
    const motherOfPerson = people.find(mother => mother.name === person.mother);

    return person.born - motherOfPerson.born;
  });

  return calculateAverage(averageAgeDiff);
}

function calculateAverage(array) {
  const sumOfAges = array.reduce((sum, age) => sum + age);

  return +((sumOfAges / array.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

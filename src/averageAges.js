'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? Math.ceil(person.died / 100) === century
      && person.sex === 'm'
    : person.sex === 'm');

  return getAverage(men);
}

function getAverage(personArr) {
  const personArrSum = personArr.reduce(
    (sum, person) => sum + (person.died - person.born), 0);

  const average = personArrSum / personArr.length;

  return average;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const woman = people.filter(person => withChildren
    ? person.sex === 'f'
      && people.some(child => child.mother === person.name)
    : person.sex === 'f');

  return getAverage(woman);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => onlyWithSon
    ? child.sex === 'm' && people.some(mother => mother.name === child.mother)
    : people.some(mother => mother.name === child.mother));

  const ageDifferences = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  }
  );

  return getAverageAge(ageDifferences, children.length);
}

function getAverageAge(ages, amountOfPeople) {
  return amountOfPeople
    ? ages.reduce((sum, age) => sum + age, 0) / amountOfPeople
    : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

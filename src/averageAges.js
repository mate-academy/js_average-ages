'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateAverage(peopleArr, vulue1, value2) {
  const sumOfAges = peopleArr.reduce((sum, age) => {
    return sum + (age[vulue1] - age[value2]);
  }, 0);

  return sumOfAges / peopleArr.length;
}

function calculateMenAverageAge(people, century) {
  const peopleArr = people.filter((person) => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const averageAge = calculateAverage(peopleArr, 'died', 'born');

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  const peopleArr = people.filter((person) =>
    withChildren
      ? people.find((child) => child.mother === person.name)
      : person.sex === 'f'
  );

  const averageAge = calculateAverage(peopleArr, 'died', 'born');

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleArr = people.filter((person) =>
    onlyWithSon
      ? person.sex === 'm'
        && people.some((mother) => {
          if (person.mother === mother.name) {
            person.motherBorn = mother.born;

            return true;
          }
        })
      : people.some((mother) => {
        if (person.mother === mother.name) {
          person.motherBorn = mother.born;

          return true;
        }
      })
  );

  const averageAge = calculateAverage(peopleArr, 'born', 'motherBorn');

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

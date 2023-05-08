'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const peopleArr = people.filter((person) => {
    return century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  const sumOfAges = peopleArr.reduce((sum, age) => {
    return sum + (age.died - age.born);
  }, 0);

  return sumOfAges / peopleArr.length;
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
      ? people.find((child) => child.mother === person.name) !== undefined
      : person.sex === 'f'
  );

  const sumOfAges = peopleArr.reduce((sum, age) => {
    return sum + (age.died - age.born);
  }, 0);

  return sumOfAges / peopleArr.length;
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
            person['motherBorn'] = mother.born;

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

  const sumOfAges = peopleArr.reduce((sum, age) => {
    return sum + (age.born - age.motherBorn);
  }, 0);

  return sumOfAges / peopleArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

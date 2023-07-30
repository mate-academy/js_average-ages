'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = isMan(people)
    .filter(man => !century || Math.ceil(man.died / 100) === century);

  return averageAgeComplete(men);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = isWoman(people)
    .filter(woman => !withChildren
      || people.some(person => person.mother === woman.name));

  return averageAgeComplete(women);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = isWoman(people);
  const men = isMan(people);
  const targetPeople = onlyWithSon ? men : people;
  const mothers = women
    .filter(woman => targetPeople.some(person => person.mother === woman.name));

  const ageDifferences = targetPeople
    .map(child => {
      const specificMother = mothers
        .find(mother => mother.name === child.mother);

      return specificMother ? child.born - specificMother.born : null;
    })
    .filter(ageDiff => ageDiff !== null);

  return averageAgePartial(ageDifferences);
}

function isMan(array) {
  return array.filter(arr => arr.sex === 'm');
}

function isWoman(array) {
  return array.filter(arr => arr.sex === 'f');
}

function averageAgeComplete(array) {
  const lifeYears = array.map(arr => arr.died - arr.born);

  return averageAgePartial(lifeYears);
}

function averageAgePartial(array) {
  const sumOfDifferences = array.reduce((sum, n) => (sum + n), 0);

  return sumOfDifferences / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

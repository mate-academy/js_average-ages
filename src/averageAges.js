'use strict';

function calculateMenAverageAge(people, century) {
  const filteredMen = people.filter(person =>
    century ? person.sex === 'm'
    && Math.ceil(person.died / 100) === century : person.sex === 'm'
  );

  const ageArray = filteredMen.map(person => person.died - person.born);

  return ageArray.reduce((ageSum, age) => ageSum + age, 0) / ageArray.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter(person =>
    withChildren ? person.sex === 'f'
    && people.some(child => child.mother === person.name) : person.sex === 'f');

  const ageArray = filteredWomen.map(person => person.died - person.born);

  return ageArray.reduce((ageSum, age) => ageSum + age, 0) / ageArray.length;
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && (people.find(mother => mother.name === person.mother)))
    : people.filter(person =>
      (people.find(mother => mother.name === person.mother)));

  const DiffArr = filteredPeople.map(person =>
    person.born - (people.find(mother => mother.name === person.mother)).born);

  return DiffArr.reduce((ageSum, age) => ageSum + age, 0) / DiffArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

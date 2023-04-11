'use strict';

function calculateMenAverageAge(people, century) {
  const filteredMen = people.filter(person =>
    century ? person.sex === 'm'
    && Math.ceil(person.died / 100) === century : person.sex === 'm'
  );

  const ageArray = filteredMen.map(person => person.died - person.born);

  return getAverageAge(ageArray);
}

function getAverageAge(array) {
  return array.reduce((ageSum, age) => ageSum + age, 0) / array.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter(person =>
    withChildren ? person.sex === 'f'
    && people.some(child => child.mother === person.name) : person.sex === 'f');

  const ageArray = filteredWomen.map(person => person.died - person.born);

  return getAverageAge(ageArray);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && (people.find(mother => mother.name === person.mother)))
    : people.filter(person =>
      (people.find(mother => mother.name === person.mother)));

  const diffArr = filteredPeople.map(person =>
    person.born - (people.find(mother => mother.name === person.mother)).born);

  return getAverageAge(diffArr);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

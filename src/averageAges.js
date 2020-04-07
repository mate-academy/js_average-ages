'use strict';

function calculateMenAverageAge(people, century) {
  let filteredLength = 0;
  let filteredPeople = people.filter(person => {
    return century === undefined
      ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century;
  });

  filteredLength = filteredPeople.length;

  filteredPeople = filteredPeople.reduce((averageAge, item) => {
    return averageAge + item.died - item.born;
  }, 0);

  return filteredPeople / filteredLength;
}

function calculateWomenAverageAge(people, withChildren) {
  let filteredLength = 0;
  let filteredPeople = people.filter(person => {
    return withChildren
      ? person.sex === 'f' && people.some(item => item.mother === person.name)
      : person.sex === 'f';
  });

  filteredLength = filteredPeople.length;

  filteredPeople = filteredPeople.reduce((averageAge, item) => {
    return averageAge + item.died - item.born;
  }, 0);

  return filteredPeople / filteredLength;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const onBirthAges = [];
  const onBirthAgesMen = [];

  people.forEach(mother => {
    people.some(child => {
      if (child.mother === mother.name) {
        onBirthAges.push(child.born - mother.born);
      }

      if (child.mother === mother.name && child.sex === 'm') {
        onBirthAgesMen.push(child.born - mother.born);
      }
    });
  });

  const ages = onBirthAges.length;
  const agesForMen = onBirthAgesMen.length;

  return onlyWithSon
    ? onBirthAgesMen.reduce((accum, value) => accum + value) / agesForMen
    : onBirthAges.reduce((accum, value) => accum + value) / ages;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

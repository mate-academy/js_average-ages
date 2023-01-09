'use strict';

const calculateSumAges = (filteredPeople) => {
  return filteredPeople.reduce((sum, person) => {
    const personsAge = person.died - person.born;

    return sum + personsAge;
  }, 0);
};

function calculateMenAverageAge(people, century) {
  const filteredMen = people.filter((person) => (
    !century
      ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century
  ));

  const menAgeSum = calculateSumAges(filteredMen);

  return menAgeSum / filteredMen.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter((person) => (
    !withChildren
      ? person.sex === 'f'
      : person.sex === 'f' && people.some(child => child.mother === person.name)
  ));

  const womenAgeSum = calculateSumAges(filteredWomen);

  return womenAgeSum / filteredWomen.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childWithMother = people.filter(child => (
    !onlyWithSon
      ? people.some(mother => mother.name === child.mother)
      : people.some(mother => mother.name === child.mother && child.sex === 'm')
  ));

  const sumAgesDifference = childWithMother.reduce((sum, child) => {
    const motherBirth = people.find(mother => (
      mother.name === child.mother
    )).born;
    const ageDifference = child.born - motherBirth;

    return sum + ageDifference;
  }, 0);

  return sumAgesDifference / childWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

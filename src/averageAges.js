'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(man => (
    man.sex === 'm'
    && (!century || Math.ceil(man.died / 100) === century)
  ));

  return getAverageAgeOf(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(({ name, sex }) => (
    sex === 'f'
    && (!withChildren || people.some(person => person.mother === name))
  ));

  return getAverageAgeOf(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const getMotherByName = (motherName) => people.find(
    person => person.name === motherName
  );

  const children = people.filter(({ mother, sex }) => (
    getMotherByName(mother) 
    && (!onlyWithSon || sex === 'm')
  ));

  const ages = children.map(child => (
    child.born - getMotherByName(child.mother).born
  ));

  return getAverage(ages);
}

function getAverage(numbers) {
  const total = numbers.reduce((total, next) => total + next, 0);
  
  return total / numbers.length;
}

function getAverageAgeOf(people) {
  const ages = people.map(person => person.died - person.born);

  return getAverage(ages);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

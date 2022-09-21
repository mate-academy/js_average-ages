'use strict';

function calculateMenAverageAge(people, century) {
  const whatWeFiler = people.filter(person => (
    arguments.length === 1
      ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century
  ));
  const ageDiffArray = [];

  whatWeFiler.forEach(person => {
    ageDiffArray.push(person.died - person.born);
  });

  return calculateAverageAge(ageDiffArray);
}

function calculateWomenAverageAge(people, withChildren) {
  const whatWeFiler = people.filter(person => (
    arguments.length === 1
      ? person.sex === 'f'
      : person.sex === 'f' && people.some(some => some.mother === person.name)
  ));
  const ageDiffArray = [];

  whatWeFiler.forEach(person => {
    ageDiffArray.push(person.died - person.born);
  });

  return calculateAverageAge(ageDiffArray);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDiffArray = [];

  people.forEach((person, index, list) => {
    const motherIndex = list.findIndex(some => some.name === person.mother);

    if (motherIndex !== -1) {
      if ((onlyWithSon && person.sex === 'm') || (onlyWithSon === undefined)) {
        ageDiffArray.push(person.born - list[motherIndex].born);
      }
    }
  });

  return calculateAverageAge(ageDiffArray);
}

function calculateAverageAge(data) {
  const averageAge = data.reduce((accumulator, current) => (
    accumulator + current
  ), 0);

  return averageAge / data.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

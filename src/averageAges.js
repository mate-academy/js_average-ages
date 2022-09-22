'use strict';

function calculateMenAverageAge(people, century) {
  const whatWeFiler = people.filter(person => (
    century === undefined
      ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century
  ));

  const ageDiff = ageDifference(whatWeFiler);

  return calculateAverageAge(ageDiff);
}

function calculateWomenAverageAge(people, withChildren) {
  const whatWeFiler = people.filter(person => (
    withChildren === undefined
      ? person.sex === 'f'
      : person.sex === 'f' && people.some(some => some.mother === person.name)
  ));

  const ageDiff = ageDifference(whatWeFiler);

  return calculateAverageAge(ageDiff);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDiff = [];

  people.forEach((person, index, list) => {
    const motherIndex = list.findIndex(some => some.name === person.mother);

    if (motherIndex !== -1) {
      if ((onlyWithSon && person.sex === 'm') || (onlyWithSon === undefined)) {
        ageDiff.push(person.born - list[motherIndex].born);
      }
    }
  });

  return calculateAverageAge(ageDiff);
}

function calculateAverageAge(data) {
  const averageAge = data.reduce((accumulator, current) => (
    accumulator + current
  ), 0);

  return averageAge / data.length;
}

function ageDifference(whatWeFiler) {
  const ageDiff = [];

  whatWeFiler.forEach(person => {
    ageDiff.push(person.died - person.born);
  });

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

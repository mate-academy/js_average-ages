'use strict';

function calculateMenAverageAge(people, century) {
  const filtredPeopleBySex = people.filter(person => person.sex === 'm');
  let whatWeFiler = filtredPeopleBySex;
  const ageDiffArray = [];

  if (arguments.length > 1) {
    const filtredByCentury = filtredPeopleBySex.filter(person => {
      return Math.ceil(person.died / 100) === century;
    });

    whatWeFiler = filtredByCentury;
  }

  whatWeFiler.forEach(person => {
    ageDiffArray.push(person.died - person.born);
  });

  return calculateAverageAge(ageDiffArray);
}

function calculateWomenAverageAge(people, withChildren) {
  const filtredPeopleBySex = people.filter(person => person.sex === 'f');
  const peopleMothers = people.map(about => about.mother);
  const ageDiffArray = [];

  let whatWeFiler = filtredPeopleBySex;

  if (withChildren) {
    const filtredMotherOrNot = filtredPeopleBySex.filter(person => {
      const motherName = person.name;

      return peopleMothers.includes(motherName);
    });

    whatWeFiler = filtredMotherOrNot;
  }

  whatWeFiler.forEach(person => {
    ageDiffArray.push(person.died - person.born);
  });

  return calculateAverageAge(ageDiffArray);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDiffArray = [];

  people.forEach((person, index, list) => {
    const motherIndex = list.some(someone => someone.name === person.mother)
      ? list.findIndex(someone => someone.name === person.mother)
      : null;

    if (motherIndex !== null) {
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

  return +(averageAge / data.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

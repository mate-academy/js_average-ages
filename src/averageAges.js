'use strict';

function calculateMenAverageAge(people, century) {
  const filtredPeopleBySex = people.filter(person => person.sex === 'm');
  let whatWeFiler = filtredPeopleBySex;

  if (arguments.length > 1) {
    const filtredByCentury = filtredPeopleBySex.filter(person => {
      return Math.ceil(person.died / 100) === century;
    });

    whatWeFiler = filtredByCentury;
  }

  return calculateAverageAge(whatWeFiler);
}

function calculateWomenAverageAge(people, withChildren) {
  const filtredPeopleBySex = people.filter(person => person.sex === 'f');
  const peopleMothers = people.map(about => about.mother);

  let whatWeFiler = filtredPeopleBySex;

  if (withChildren) {
    const filtredMotherOrNot = filtredPeopleBySex.filter(person => {
      const motherName = person.name;

      return peopleMothers.includes(motherName);
    });

    whatWeFiler = filtredMotherOrNot;
  }

  return calculateAverageAge(whatWeFiler);
}

function calculateAverageAge(data) {
  const averageAge = data.reduce((accumulator, current) => (
    accumulator + current.died - current.born
  ), 0);

  return +(averageAge / data.length).toFixed(2);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filtredPeopleBySex = people.filter(person => person.sex === 'f');
  const peopleMothers = people.map(about => about.mother);
  const filtredMotherOrNot = filtredPeopleBySex.filter(person => {
    const motherName = person.name;

    return peopleMothers.includes(motherName);
  });

  const ageDiffArray = [];

  for (const mother of filtredMotherOrNot) {
    if (people.some(person => person.mother === mother.name)) {
      const childrens = people.filter(person => person.mother === mother.name);

      for (let j = 0; j < childrens.length; j++) {
        const checkOnFemale = childrens[j].sex === 'f';
        const ageDiff = childrens[j].born - mother.born;

        if (onlyWithSon && checkOnFemale) {
          continue;
        }

        ageDiffArray.push(ageDiff);
      }
    }
  }

  const averageAge = ageDiffArray.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);

  return +(averageAge / ageDiffArray.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

'use strict';

function calculateMenAverageAge(people, century) {
  const result = people.filter(person => person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century));
  const finalResult = result.reduce((sum, person) =>
    sum + person.died - person.born, 0);

  return finalResult / result.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const result = people.filter(person => person.sex === 'f'
    && (!withChildren || people.find(children =>
      children.mother === person.name)));
  const finalResult = result.reduce((sum, person) =>
    sum + person.died - person.born, 0);

  return finalResult / result.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothersObject = people.filter(person =>
    person.sex === 'f').reduce((mothersAccumulated, mother) => {
    return {
      ...mothersAccumulated,
      [mother.name]: {
        born: mother.born,
        childrenBornYears: people.filter(person =>
          person.mother === mother.name).filter(person =>
          onlyWithSon ? person.sex === 'm' : true).map(({ born }) => born),
      },
    };
  }, {});

  const motherNames = Object.keys(mothersObject);
  let mothersTotal = 0;
  const ageDiffs = motherNames.flatMap(motherName => {
    const mother = mothersObject[motherName];

    return mother.childrenBornYears.map(year => {
      mothersTotal += 1;

      return year - mother.born;
    });
  });

  return ageDiffs.reduce((ages, age) => ages + age, 0) / mothersTotal;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

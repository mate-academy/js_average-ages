'use strict';

function averageAge(arg) {
  return arg.reduce((prev, sex) => prev + (sex.died - sex.born), 0)
    / arg.length;
}

function calculateMenAverageAge(people, century) {
  const males = people.filter(person =>
    (century === undefined)
      ? person.sex === 'm'
      : person.sex === 'm'
        && Math.ceil(person.died / 100) === century);

  return averageAge(males);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    (withChildren === undefined)
      ? person.sex === 'f'
      : person.sex === 'f'
        && people.some(child =>
          child.mother === person.name));

  return averageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const res = [];

  (onlyWithSon === undefined)
    ? (people.forEach(mothers => people.map(person => {
      if (person.mother === mothers.name) {
        res.push(person.born - mothers.born);
      }
    }))
    )

    : (people.forEach(mothers => people.map(person => {
      if (person.mother === mothers.name && person.sex === 'm') {
        res.push(person.born - mothers.born);
      }
    }))
    );

  return res.reduce((prev, diff) =>
    prev + diff, 0) / res.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

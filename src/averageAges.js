'use strict';

function calculateTotalAge(people) {
  return people
    .reduce((ages, person) => ages + (person.died - person.born), 0);
};

function calculateMenAverageAge(people, century) {
  const men = people
    .filter(person => {
      const isMan = person.sex === 'm';
      const isManFromCentury = Math.ceil(person.died / 100) === century;

      return isMan
        && (century
          ? isManFromCentury
          : true);
    });

  const menSumAge = calculateTotalAge(men);

  return menSumAge / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people
    .filter(woman => {
      const isMother = people.some(person => person.mother === woman.name);

      return woman.sex === 'f'
        && (withChildren
          ? isMother
          : true);
    });

  const womenAgeSum = calculateTotalAge(women);

  return womenAgeSum / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people
    .filter(person => {
      const hasMother = people.some(woman => woman.name === person.mother);

      return hasMother && (onlyWithSon
        ? person.sex === 'm'
        : true);
    });

  const differencesSum = children
    .reduce((acc, child) => {
      const motherChild = people.find(person => person.name === child.mother);

      return acc + (child.born - motherChild.born);
    }, 0);

  return differencesSum / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

'use strict';

function calculateMenAverageAge(people, century) {
  let mens = century ? people.filter(person => person.sex === 'm' && Math.ceil(person.died / 100) === century) : people.filter(person => person.sex === 'm');
  let totalAge = mens.reduce((sum, men) => sum + (men.died - men.born), 0);
  let averageAge = totalAge / mens.length;

  return +averageAge.toFixed(2);
}

function calculateWomenAverageAge(people, withChildren) {
  let womanTotal = people.filter(person => person.sex === 'f');
  let womanWithChild = [];
  let totalAge;
  let averageAge;
  if (withChildren) {
    for (let i = 0; i < womanTotal.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (womanTotal[i].name === people[j].mother) {
          womanWithChild.push(womanTotal[i]);
          break;
        }
      }
    }
    totalAge = womanWithChild.reduce((sum, person) => sum + (person.died - person.born), 0);
    averageAge = totalAge / womanWithChild.length;

    return +averageAge.toFixed(2);
  }

  totalAge = womanTotal.reduce((sum, person) => sum + (person.died - person.born), 0);
  averageAge = totalAge / womanTotal.length;

  return +averageAge.toFixed(2);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let womanTotal = people.filter(person => person.sex === 'f');
  let average = [];
  let mothers = [];
  let totalDiff;
  let diff;

  for (let i = 0; i < womanTotal.length; i++) {
    for (let j = 0; j < people.length; j++) {
      if (womanTotal[i].name === people[j].mother) {
        mothers.push(womanTotal[i]);
        break;
      }
    }
  }

  for (let i = 0; i < mothers.length; i++) {
    for (let j = 0; j < people.length; j++) {
      if (mothers[i].name === people[j].mother) {
        if (onlyWithSon) {
          if (people[j].sex === 'm') {
            average.push(people[j].born - mothers[i].born);
            continue;
          }
        } else {
          average.push(people[j].born - mothers[i].born);
        }
      }
    }
  }

  totalDiff = average.reduce((sum, person) => sum + person, 0);
  diff = totalDiff / average.length;

  return +diff.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff
};

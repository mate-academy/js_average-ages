'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
const countAverageValue = humans => {
  return Math.round((humans.reduce((sum, item) => sum + item, 0)
      / humans.length) * 100) / 100;
};

function calculateMenAverageAge(people, century) {
  const filterMen = people
    .filter(person => person.sex === 'm')
    .filter(person => {
      if (century) {
        return Math.ceil(person.died / 100) === century;
      } else {
        return person;
      }
    })
    .map((person) => person.died - person.born);

  return countAverageValue(filterMen);
}

function calculateWomenAverageAge(people, withChildren) {
  const filterWoman = people
    .filter(person => person.sex === 'f')
    .filter(person => {
      if (withChildren) {
        return people.some(woman => woman.mother === person.name);
      } else {
        return person;
      }
    })
    .map(person => person.died - person.born);

  return countAverageValue(filterWoman);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = new Map();

  people.forEach(person => {
    const mother = people.find(item => item.name === person.mother);
    if (mother) {
      mothers.set(person, mother);
    }
  });

  const differenceAges = people
    .filter(person => mothers.has(person))
    .filter(person => !onlyWithSon || person.sex === 'm')
    .map(person => person.born - mothers.get(person).born);

  return countAverageValue(differenceAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

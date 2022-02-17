'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array.
 * If `century` is specified then function
 * calculates average age only for men who died in this
 * century
 *
 * To calculate century:
 * Divide year of person's death by 100:
 * Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    return person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century);
  });

  const sumOfAges = men.reduce(
    (accumulator, person) => (accumulator + person.died - person.born), 0
  );

  return Math.round(sumOfAges / men.length * 100) / 100;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    person.sex === 'f'
  && (!withChildren || people.some(child => child.mother === person.name)));

  const sumOfAges = women.reduce(
    (accumulator, person) => (accumulator + person.died - person.born), 0
  );

  return Math.round(sumOfAges / women.length * 100) / 100;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => {
    return people.some(
      mother => person.mother === mother.name)
      && (!onlyWithSon || person.sex === 'm');
  });

  const difference = children.map(child => {
    return (child.born - people.find(
      mother => mother.name === child.mother).born);
  }).reduce(
    (a, b) => (a + b), 0);

  return Math.round(difference / children.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

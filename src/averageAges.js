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

const sexMan = (people) => people.filter(person => person.sex === 'm');
const sexWoman = (people) => people.filter(person => person.sex === 'f');
const diedInCentury = (people, century) => people
  .filter(person => (Math.ceil(person.died / 100)) === century);
const age = (people) => people.map(person => person.died - person.born);
const someonesMother = (people, mother) => people
  .some(person => person.mother === mother);
const hasChildren = (people) => people
  .filter(person => someonesMother(people, person.name));
const averageAge = (ageLived) =>
  +(((ageLived.reduce((sum, number) =>
    sum + number, 0)) / ageLived.length).toFixed(2));

function calculateMenAverageAge(people, century) {
  return century
    ? averageAge(age(diedInCentury(sexMan(people), century)))
    : averageAge(age(sexMan(people)));
}

function calculateWomenAverageAge(people, withChildren) {
  return withChildren
    ? averageAge(age(hasChildren(people)))
    : averageAge(age(sexWoman(people)));
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const motherChildPairs = [];

  people.forEach(person => {
    const motherObj = people.find(p => p.name === person.mother);

    if (motherObj && (!onlyWithSon || person.sex === 'm')) {
      const ageDiff = Math.abs(motherObj.born - person.born);

      motherChildPairs.push(ageDiff);
    }
  });

  const averageAgeDiff = motherChildPairs
    .reduce((sum, diff) => sum + diff, 0) / motherChildPairs.length;

  return +averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

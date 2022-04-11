'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );
  const age = men.map(man => man.died - man.born);

  return averageAgeCalc(age);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const children = people.filter(person => !!person.mother === true);
  const mothers = children.map(child => child.mother);

  const women = people.filter(woman => withChildren
    ? woman.sex === 'f' && mothers.includes(woman.name)
    : woman.sex === 'f'
  );

  const age = women.map(woman => woman.died - woman.born);

  return averageAgeCalc(age);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = people.filter(person =>
    person.sex === 'f'
    && people.some(child => child.mother === person.name));

  const children = people.filter(person => onlyWithSon
    ? person.sex === 'm'
    && people.some(mother => person.mother === mother.name)
    : people.some(mother => person.mother === mother.name));

  const difference = children.map(child =>
    child.born - women.find(mother => mother.name === child.mother).born);

  return averageAgeCalc(difference);
}

function averageAgeCalc(arr) {
  return arr.reduce((previousValue, currentValue) =>
    previousValue + currentValue, 0) / arr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

'use strict';

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function getAge(person) {
  const age = person.died - person.born;

  return age;
}

function calculateAverageAge(people) {
  const sumOfAllAges = people.reduce((prev, person) =>
    prev + getAge(person), 0);

  return sumOfAllAges / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(filterMen);

  function filterMen(person) {
    return century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  }

  return calculateAverageAge(men);
}

/*

 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(({ sex, name }) => {
    return sex === 'f'
    && (!withChildren || people.some(person => person.mother === name));
  });

  return calculateAverageAge(women);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const findMother = people.filter(item => {
    return people.find(person => person.mother === item.name);
  });

  const relatives = people.filter(child => {
    const mother = findMother.find(person => person.name === child.mother);

    return onlyWithSon
      ? mother && child.sex === 'm'
      : mother;
  });

  const ageDiff = relatives.map(child =>
    child.born - findMother.find(mother => child.mother === mother.name).born);

  const avgDiff = ageDiff.reduce((sum, diff) => sum + diff, 0) / ageDiff.length;

  return avgDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

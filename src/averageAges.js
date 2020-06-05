'use strict';

// const { includes } = require('./people');

/**
 * @param {object[]} people
 * @param {number} century - optional
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  let men;

  (century === undefined)
    ? men = people.filter(man => man.sex === 'm')
    : men = people.filter(man => Math.floor(man.died / 100) === century - 1
    && man.sex === 'm');

  const average = men.reduce((sum, man) =>
    sum + (man.died - man.born), 0) / men.length;

  return average;
}
/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const children = people.filter(childWithMom => childWithMom.mother !== null);
  const momsNames = children.map(childWithMom => childWithMom.mother);
  const mothersData = (withChildren === undefined)
    ? people.filter(woman => woman.sex === 'f')
    : people.filter(person => momsNames.includes(person.name));

  const average = mothersData.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0) / mothersData.length;

  return average;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  function findMom(child) {
    const findMother = people.filter(mom => mom.name === child.mother);

    return ((findMother.map(kidMom => kidMom.born))[0]);
  }

  const peopleWithMomAge = people.map(kid => {
    return {
      ...kid,
      motherAge: findMom(kid),
    };
  });

  const childWithKnownMother = (onlyWithSon)
    ? peopleWithMomAge.filter(child => child.motherAge !== undefined
    && child.sex === 'm')
    : peopleWithMomAge.filter(child => child.motherAge !== undefined);
  const ageDifference = childWithKnownMother.reduce(
    function(sum, child) {
      return child.born - child.motherAge + sum;
    }, 0);

  return ageDifference / childWithKnownMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

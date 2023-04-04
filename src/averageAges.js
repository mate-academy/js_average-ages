'use strict';

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filteredAges = people.filter((person) =>
    person.sex === 'm'
    && (century ? Math.ceil(person.died / 100) === century : true)
  );

  return filteredAges.reduce((sum, person) =>
    sum + person.died - person.born, 0) / filteredAges.length;
}

/*
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  const findWomen = people.filter(item => item.sex === 'f');
  const motherNames = people.map(item => item.mother);

  const selectedWomen = findWomen.filter(item =>
    motherNames.includes(item.name));

  const sumOfAges = (withChildren === true)
    ? selectedWomen.map(item => item.died - item.born)
    : findWomen.map(item => item.died - item.born);

  return sumOfAges.reduce((a, b) => (a + b), 0) / sumOfAges.length;
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

  const relatives = onlyWithSon
    ? people.filter(child => {
      const mother = findMother.find(item => item.name === child.mother);
      const isMale = child.sex === 'm';

      return mother && isMale;
    })
    : people.filter(child => {
      const mother = findMother.find(item => item.name === child.mother);

      return mother;
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

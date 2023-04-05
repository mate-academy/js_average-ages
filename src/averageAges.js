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

  function calculateAge(person) {
    return person.died - person.born;
  }

  return filteredAges.reduce((sum, person) =>
    sum + calculateAge(person), 0) / filteredAges.length;
}

/*
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const motherNames = people.map(person => person.mother);

  const selectedWomen = women.filter(person =>
    motherNames.includes(person.name));

  const sumOfAges = (withChildren === true)
    ? selectedWomen.map(person => person.died - person.born)
    : women.map(person => person.died - person.born);

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
      const mother = findMother.find(person => person.name === child.mother);
      const isMale = child.sex === 'm';

      return mother && isMale;
    })
    : people.filter(child => {
      const mother = findMother.find(person => person.name === child.mother);

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

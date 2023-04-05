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
  const findWomen = people.filter(person => {
    if (person.sex === 'f') {
      if (withChildren) {
        const hasChildren = people.some(item => item.mother === person.name);

        return hasChildren;
      }

      return true;
    }

    return false;
  });

  return findWomen.reduce((a, b) => {
    return a + (b.died - b.born);
  }, 0) / findWomen.length;
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

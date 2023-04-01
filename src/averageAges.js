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

  const totalAge = filteredAges.reduce((prev, { born, died }) => {
    return prev + (died - born);
  }, 0);

  return totalAge / filteredAges.length;
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
  const findMothers = people.filter(item => item.mother != null);
  const motherNames = findMothers.map(mother => mother.mother);

  const selectedWomen = withChildren
    ? findWomen.filter(woman => motherNames.includes(woman.name))
    : findWomen;

  const sumOfAges = selectedWomen
    .map(woman => woman.died - woman.born)
    .reduce((total, age) => total + age, 0);

  return selectedWomen.length > 0 ? sumOfAges / selectedWomen.length : 0;
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

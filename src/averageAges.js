'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const isMan = person => person.sex === 'm';
  const isManDiedInCentury = person =>
    isMan(person) && century === Math.ceil(person.died / 100);
  const men = people.filter(century ? isManDiedInCentury : isMan);
  const agesSum
    = men.reduce((sum, person) => sum + (person.died - person.born), 0);
  const menAverageAge = agesSum / men.length;

  return menAverageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const isWoman = person => person.sex === 'f';

  const hasChildren = people.filter(person => withChildren
    ? isWoman(person) && people.some(child => person.name === child.mother)
    : isWoman(person)
  );

  const womenAgesSum
    = hasChildren.reduce((sum, person) => sum + (person.died - person.born), 0);
  const womenAverageAge = womenAgesSum / hasChildren.length;

  return womenAverageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const isMaleChild = child => child.sex === 'm';

  const mothersSons = people.filter(child => onlyWithSon
    ? isMaleChild(child)
    && people.some(person => person.name === child.mother)
    : people.some(person => person.name === child.mother));

  const ageDiffs = mothersSons.reduce((sum, person) => {
    const child = people.find(mother => mother.name === person.mother);
    const motherChildDiff = person.born - child.born;

    return sum + motherChildDiff;
  }, 0);

  const averageAgeDiff = ageDiffs / mothersSons.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

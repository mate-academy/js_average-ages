'use strict';

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menList = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const averageAge = (menList
    .map(men => men.died - men.born)
    .reduce((a, b) => a + b)) / menList.length;

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenList = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const averageAge = (womenList
    .map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b)) / womenList.length;

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const mothers = people
    .filter(mother => people.some(child => child.mother === mother.name));

  const children = onlyWithSon
    ? people
      .filter(person => mothers.some(mother => mother.name === person.mother)
      && person.sex === 'm')
    : people
      .filter(person => mothers.some(mother => mother.name === person.mother));

  const differenceOfAge = children.reduce((difference, child) => {
    const childMom = mothers.find(woman => woman.name === child.mother);

    return difference + (child.born - childMom.born);
  }, 0);

  return differenceOfAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

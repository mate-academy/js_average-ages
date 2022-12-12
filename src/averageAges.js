'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = (century)
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const totalMenAge = men.reduce((prev, current) => {
    return (prev + current.died - current.born);
  }, 0);

  return totalMenAge / men.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = (withChildren)
    ? people.filter(woman => (
      people.find(person => woman.name === person.mother)
    ))
    : people.filter(person => person.sex === 'f');

  const totalWomenAge = women.reduce((prev, current) => {
    return (prev + current.died - current.born);
  }, 0);

  return totalWomenAge / women.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => {
    return people.find(person => person.name === child.mother);
  });

  const onlySons = (onlyWithSon)
    ? children.filter(person => person.sex === 'm')
    : children;

  const sumDifference = onlySons.reduce((prev, child) => {
    const motherAgeAtBirth = people
      .find(person => person.name === child.mother).born;
    const sum = prev + child.born - motherAgeAtBirth;

    return sum;
  }, 0);

  return sumDifference / onlySons.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

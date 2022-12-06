'use strict';

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    const isMale = person.sex === 'm';

    return century
      ? isMale && Math.ceil(person.died / 100) === century
      : isMale;
  });

  const calculateAge = men.map(person => person.died - person.born);

  return calculateAverageAge(calculateAge);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => (
    withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
  ));

  const calculateAge = women.map(person => person.died - person.born);

  return calculateAverageAge(calculateAge);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => (
    onlyWithSon
      ? people.find(mother => mother.name === person.mother)
        && person.sex === 'm'
      : people.find(mother => mother.name === person.mother)
  ));

  const calculateAge = children.map(person =>
    (person.born - people.find(mother => mother.name === person.mother).born));

  return calculateAverageAge(calculateAge);
}

const calculateAverageAge = (totalAges) =>
  totalAges.reduce((sum, age) => sum + age) / totalAges.length;

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

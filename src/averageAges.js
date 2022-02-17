'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 * @param {boolean} withChildren - optional
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const men = people.filter(
    !century
      ? ({ sex }) => sex === 'm'
      : ({ sex, died }) => sex === 'm' && Math.ceil(died / 100) === century
  );

  return averageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(
    !withChildren
      ? ({ sex }) => sex === 'f'
      : ({ name }) =>
        people.some(({ mother }) => mother === name)
  );

  return averageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(({ name }) =>
    people.some(({ mother }) => mother === name));

  const kids = people.filter(
    !onlyWithSon
      ? person => people.some(mother =>
        mother.name === person.mother)
      : person => people.some((mother, sex) =>
        mother.name === person.mother && person.sex === 'm')
  );

  const yearDifference = kids.map(kid =>
    kid.born - mothers.find((mother) => kid.mother === mother.name).born);

  return yearDifference.reduce((a, b) => a + b, 0) / kids.length;
}

function averageAge(people) {
  return people.reduce((accumulator, { born, died }) =>
    accumulator + (died - born), 0) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

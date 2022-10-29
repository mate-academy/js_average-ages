'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const males = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century
    )

    : people.filter(person => person.sex === 'm');

  const malesLifeLength = males
    .map(person => person.died - person.born);

  const malesAverageAge = malesLifeLength
    .reduce((ages, current) => ages + current) / malesLifeLength.length;

  return malesAverageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const females = withChildren
    ? people
      .filter(person => person.sex === 'f')
      .filter(female => (people.find(person => person.mother === female.name)))

    : people.filter(person => person.sex === 'f');

  const femaleLifeLength = females
    .map(person => person.died - person.born);

  const femalesAverageAge = femaleLifeLength
    .reduce((ages, current) => ages + current) / femaleLifeLength.length;

  return femalesAverageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people
      .filter(person => people
        .find(mother => person.mother === mother.name
        )

    && person.sex === 'm'
      )

    : people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const diff = children
    .map(person => person.born - people
      .find(mother => person.mother === mother.name).born);

  const averageAgeDiff = diff
    .reduce((ages, current) => ages + current) / diff.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

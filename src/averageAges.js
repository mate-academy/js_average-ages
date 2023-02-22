'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const sortByCentury = century
    ? people.filter((person) => Math.ceil(person.died / 100) === century)
    : people;

  const sortByGender = sortByCentury.filter((person) => person.sex === 'm');

  const averageAge = sortByGender.reduce((acc, person) => acc
    + (person.died - person.born), 0)
    / sortByGender.length;

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person) => person.sex === 'f');
  const motherNames = people.map((person) => person.mother);
  const womenWithChildren = women.filter((person) =>
    motherNames.includes(person.name)
  );

  const averageAge = withChildren
    ? (womenWithChildren
      .reduce((acc, person) => acc + (person.died - person.born), 0))
      / womenWithChildren.length
    : (
      women.reduce((acc, person) => acc + (person.died - person.born), 0)
      / women.length
    );

  return averageAge;
}

/**
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter((person) =>
    people.find((mother) =>
      mother.name === person.mother
      && (onlyWithSon ? person.sex === 'm' : true)
    )
  );

  const different = children.reduce((acc, person) => {
    const mother = people.find((women) =>
      women.name === person.mother);

    return acc + (person.born - mother.born);
  }, 0);

  return different / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

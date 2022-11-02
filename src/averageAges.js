'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const peopleEdited = century
    ? people.filter(person => (
      Math.ceil(person.died / 100) === century
    ))
    : people;

  return calculateAverageAge(peopleEdited
    .filter(findMen)
    .map(person => person.died - person.born));
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const edited = withChildren
    ? people.filter(person => (
      people.some(child => child.mother === person.name)
    ))
    : people.filter(findWomen);

  return calculateAverageAge(edited.map(person => person.died - person.born));
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleEdited = !onlyWithSon
    ? people
    : people.filter(findMen);

  peopleEdited.filter(person => person.mother !== null);

  const filterList = peopleEdited.filter(child => (people.find(person => (
    child.mother === person.name
  ))));

  const found = filterList.map(child => (child.born - people.find(person => (
    person.name === child.mother)).born));

  return calculateAverageAge(found);
}

function calculateAverageAge(table) {
  const sum = table.reduce((acc, el) => acc + el);

  return sum / table.length;
}

const findMen = person => person.sex === 'm';

const findWomen = person => person.sex === 'f';

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

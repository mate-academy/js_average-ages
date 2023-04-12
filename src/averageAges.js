'use strict';

function averageAge(menWomen) {
  return menWomen.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / menWomen.length;
}

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const men = people.filter(({ sex, died }) => (
    century
      ? century === Math.ceil(died / 100) && sex === 'm'
      : sex === 'm'
  ));

  return averageAge(men);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(({ sex, name }) => (
    withChildren
      ? people.some(({ mother }) => mother === name) && sex === 'f'
      : sex === 'f'
  ));

  return averageAge(women);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleWithMother = people.filter(person =>
    people.some(mother => (
      onlyWithSon
        ? person.sex === 'm' && mother.name === person.mother
        : mother.name === person.mother
    ))
  );

  const ageDifference = peopleWithMother.map(person => {
    const personMother = people.find(mother =>
      mother.name === person.mother);

    return person.born - personMother.born;
  });

  return ageDifference.reduce((sum, age) =>
    (sum + age), 0) / peopleWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

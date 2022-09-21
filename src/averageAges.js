'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateAverageAge(ages) {
  const sumOfAge = ages.reduce((prev, age) => prev + age, 0);

  return sumOfAge / ages.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => (
    (century)
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm'
  ));

  const ages = men.map(man => man.died - man.born);

  return calculateAverageAge(ages);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => (
    people.some(someone => (
      (withChildren)
        ? person.sex === 'f' && someone.mother === person.name
        : person.sex === 'f'
    ))));

  const ages = women.map(woman => woman.died - woman.born);

  return calculateAverageAge(ages);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => (
    people.some(person => (
      (onlyWithSon)
        ? child.sex === 'm' && child.mother === person.name
        : child.mother === person.name
    ))));

  const agesDifferens = children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  return calculateAverageAge(agesDifferens);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

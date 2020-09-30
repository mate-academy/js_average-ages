'use strict';

function calculateMenAverageAge(people, century) {
  const menList = century ? people.filter(person => {
    return Math.ceil(person.died / 100) === century;
  }) : people;

  const men = menList.filter(person => person.sex === 'm');

  const ages = men.reduce((sum, man) => sum + (man.died - man.born), 0);

  return ages / men.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const womenList = withChildren ? people.filter(person => {
    return people.some(child => child.mother === person.name);
  }) : people;

  const women = womenList.filter(person => person.sex === 'f');

  const ages = women.reduce((sum, woman) => sum + (woman.died - woman.born), 0);

  return ages / women.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const ages = [];

  const women = people
    .filter(person => person.sex === 'f')
    .filter(person => people.some(child => child.mother === person.name));

  if (onlyWithSon) {
    women.map(woman => people.map(child => {
      if (child.sex === 'm' && child.mother === woman.name) {
        ages.push(child.born - woman.born);
      }
    }));
  } else {
    women.map(woman => people.map(child => {
      if (child.mother === woman.name) {
        ages.push(child.born - woman.born);
      }
    }));
  }

  const sumOfAges = ages.reduce((a, b) => {
    return a + b;
  });

  return sumOfAges / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

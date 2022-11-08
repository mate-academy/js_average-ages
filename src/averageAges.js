'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  let males = people.filter(({ sex }) => sex === 'm');

  if (century) {
    males = males.filter(male => Math.ceil(male.died / 100) === century);
  }

  const averageAges = males.map(
    male => {
      return male.died - male.born;
    })
    .reduce((p, c) => p + c) / males.length;

  return averageAges;
}

function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(({ sex }) => sex === 'f');

  if (withChildren) {
    women = women.filter(woman => people.some(
      person => person.mother === woman.name));
  }

  const ageOfWomen = women.map(
    woman => woman.died - woman.born)
    .reduce((p, c) => p + c) / women.length;

  return ageOfWomen;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const getMother = (mother) => people.find(
    ({ name }) => name === mother,
  );

  let children = people.filter(({ mother }) => getMother(mother));

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  const ageDifferences = children.map(child => {
    return child.born - getMother(child.mother).born;
  });

  return ageDifferences.reduce((p, c) => p + c)
  / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

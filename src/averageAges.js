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
  let ones = [];

  if (century === undefined) {
    ones = people.filter((person) => person.sex === 'm');
  } else {
    ones = people.filter(
      (person) => person.sex === 'm' && Math.ceil(person.died / 100) === century
    );
  }

  for (const person of ones) {
    person.age = person.died - person.born;
  }

  const sum = ones.reduce((acc, person) => acc + person.age, 0);

  return sum / ones.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = [];

  if (withChildren === undefined) {
    women = people.filter((person) => person.sex === 'f');
  } else {
    women = people.filter(
      (person) => person.sex === 'f' && ownChildren(people, person.name)
    );
  }

  function ownChildren(units, name) {
    return units.some((person) => person.mother === name);
  }

  for (const person of women) {
    person.age = person.died - person.born;
  }

  const sum = women.reduce((acc, person) => acc + person.age, 0);

  return sum / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let withMothers = [];

  if (onlyWithSon) {
    withMothers = people.filter(person => person.mother
    && person.sex === 'm');
  } else {
    withMothers = people.filter(person => person.mother);
  }

  const differences = [];

  for (const person of withMothers) {
    const mother = people.find(woman => woman.name === person.mother);

    if (mother) {
      differences.push(person.born - mother.born);
    }
  }

  const sum = differences.reduce((acc, difference) => acc + difference, 0);

  return sum / differences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

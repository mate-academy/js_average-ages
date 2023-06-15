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
  const mens = people.filter(person => person.sex === 'm');

  if (century) {
    const mensInCentury = mens.filter(men =>
      Math.ceil(men.died / 100) === century);

    const sumAgesInCentury = mensInCentury.reduce((prev, men) =>
      prev + (men.died - men.born), 0);

    return sumAgesInCentury / mensInCentury.length;
  }

  const sumAges = mens.reduce((prev, men) => prev + (men.died - men.born), 0);

  return sumAges / mens.length;
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
  const womens = people.filter(person => person.sex === 'f');

  if (withChildren) {
    const mothers = people
      .reduce((prev, person) => [...prev, person.mother], []);

    const womensWithChildren = womens
      .filter(women => mothers.includes(women.name));

    const sumAgesWomensWithChildren = womensWithChildren
      .reduce((prev, women) => prev + (women.died - women.born), 0);

    return sumAgesWomensWithChildren / womensWithChildren.length;
  }

  const sumAgesWomens = womens.reduce((prev, women) =>
    prev + (women.died - women.born), 0);

  return sumAgesWomens / womens.length;
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
  const womens = people.filter(person => person.sex === 'f');

  const mothers = people
    .reduce((prev, person) => [...prev, person.mother], []);

  const womensWithChildren = womens
    .filter(women => mothers.includes(women.name));

  const differences = [];

  if (onlyWithSon) {
    for (const person of people) {
      for (const mother of womensWithChildren) {
        if (mother.name === person.mother && person.sex === 'm') {
          const diffAges = person.born - mother.born;

          differences.push(diffAges);
        }
      }
    }

    const sumDiff = differences.reduce((prev, diff) => prev + diff, 0);

    return sumDiff / differences.length;
  }

  for (const person of people) {
    for (const mother of womensWithChildren) {
      if (mother.name === person.mother) {
        const diffAges = person.born - mother.born;

        differences.push(diffAges);
      }
    }
  }

  const sumDifferences = differences.reduce((prev, diff) => prev + diff, 0);

  return sumDifferences / differences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

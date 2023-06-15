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
  const men = isMan(people);

  const years = 100;

  if (century) {
    const mensInCentury = men.filter(man =>
      Math.ceil(man.died / years) === century);

    const sumAgesInCentury = mensInCentury.reduce((prev, man) =>
      prev + (man.died - man.born), 0);

    return sumAgesInCentury / mensInCentury.length;
  }

  const sumAges = men.reduce((prev, man) => prev + (man.died - man.born), 0);

  return sumAges / men.length;
}

function isMan(people) {
  const result = people.filter(person => person.sex === 'm');

  return result;
}

function isWoman(people) {
  const result = people.filter(person => person.sex === 'f');

  return result;
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
  const women = isWoman(people);

  if (withChildren) {
    const mothers = people
      .reduce((prev, person) => [...prev, person.mother], []);

    const womenWithChildren = women
      .filter(woman => mothers.includes(woman.name));

    const sumAgesWomenWithChildren = womenWithChildren
      .reduce((prev, woman) => prev + (woman.died - woman.born), 0);

    return sumAgesWomenWithChildren / womenWithChildren.length;
  }

  const sumAgeswomen = women.reduce((prev, woman) =>
    prev + (woman.died - woman.born), 0);

  return sumAgeswomen / women.length;
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
  const women = isWoman(people);

  const mothers = people
    .reduce((prev, person) => [...prev, person.mother], []);

  const womenWithChildren = women
    .filter(woman => mothers.includes(woman.name));

  const differences = [];

  if (onlyWithSon) {
    for (const person of people) {
      for (const mother of womenWithChildren) {
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
    for (const mother of womenWithChildren) {
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

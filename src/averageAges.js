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
  let men = people.filter(person => person.sex === 'm');

  if (century !== undefined) {
    men = men.filter(person => Math.ceil(person.died / 100) === century);
  }

  const totalAge = men.reduce((sum, person) => sum
    + (person.died - person.born), 0);
  const averageAge = parseFloat((totalAge / men.length).toFixed(2));

  return averageAge;
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
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter(woman => people.some(person =>
      person.mother === woman.name));
  }

  const totalAge = women.reduce((sum, person) => sum
    + (person.died - person.born), 0);

  const averageAge = parseFloat((totalAge / women.length).toFixed(2));

  return averageAge;
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
  const mothers = people.filter(mother => people.some(person =>
    person.mother === mother.name));

  const kids = people.filter(mummy => mummy.mother != null);

  if (onlyWithSon) {
    kids = people.filter(son => son.mother != null && son.sex === 'm');
  }

  const ageSumAndPairs = kids.reduce((accumulator, kid) => {
    const mother = mothers.find(mummy => mummy.name === kid.mother);

    if (mother) {
      const ageDifference = kid.born - mother.born;

      accumulator.ageSum += ageDifference;
      accumulator.numberOfPairs++;
    }

    return accumulator;
  },
  {
    ageSum: 0, numberOfPairs: 0,
  });

  if (ageSumAndPairs.numberOfPairs > 0) {
    const averageAgeDiff = ageSumAndPairs.ageSum / ageSumAndPairs.numberOfPairs;

    return Number(averageAgeDiff.toFixed(2));
  } else {
    return 0;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

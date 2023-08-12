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
  if (century === undefined) {
    const maleAges = people
      .filter(person => person['sex'] === 'm')
      .map(person => (person['died'] - person['born']));

    const totalMaleAge = maleAges.reduce((sum, age) => sum + age, 0);

    return totalMaleAge / maleAges.length;
  } else {
    const maleAges = people
      .filter(person => person['sex'] === 'm'
        && Math.ceil(person['died'] / 100) === century)
      .map(person => (person['died'] - person['born']));

    const totalMaleAge = maleAges.reduce((sum, age) => sum + age, 0);

    return totalMaleAge / maleAges.length;
  }
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  function isMother(name) {
    return people.some(person => person['mother'] === name);
  };

  if (withChildren !== undefined) {
    const womenAges = people
      .filter(person => person['sex'] === 'f'
        && isMother(person['name']))
      .map(person => (person['died'] - person['born']));

    const womenTotalAge = womenAges.reduce((sum, age) => sum + age, 0);

    return womenTotalAge / womenAges.length;
  } else {
    const womenAges = people
      .filter(person => person['sex'] === 'f')
      .map(person => (person['died'] - person['born']));

    const womenTotalAge = womenAges.reduce((sum, age) => sum + age, 0);

    return womenTotalAge / womenAges.length;
  }
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
  let childrenWithMothers = people
    .filter(child => child['mother'] !== null);

  if (onlyWithSon) {
    childrenWithMothers = childrenWithMothers
      .filter(child => child['sex'] === 'm');
  }

  const ageDifferences = childrenWithMothers.map(child => {
    const mother = people.filter(person => person['sex'] === 'f')
      .find(person => person['name'] === child['mother']);

    if (mother) {
      return child['born'] - mother['born'];
    } else {
      return null;
    }
  });

  const ageDifferencesSorted = ageDifferences
    .filter(ageDiff => ageDiff !== null);

  if (ageDifferencesSorted.length === 0) {
    return null;
  }

  const totalAgeDifference = ageDifferencesSorted
    .reduce((sum, ageDifference) => sum + ageDifference, 0);

  return totalAgeDifference / ageDifferencesSorted.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

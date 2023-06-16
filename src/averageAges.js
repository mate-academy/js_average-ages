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
  let totalAge = 0;
  let fitManCounter = 0;

  for (const person of people) {
    if (person.sex !== 'm') {
      continue;
    }

    const currentAge = person.died - person.born;

    if (!century) {
      totalAge += currentAge;
      fitManCounter++;
      continue;
    }

    const dieCentury = Math.ceil(person.died / 100);

    if (dieCentury === century) {
      totalAge += currentAge;
      fitManCounter++;
    }
  }

  return +(totalAge / fitManCounter);
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
  let totalAge = 0;
  let fitWomanCounter = 0;

  for (const person of people) {
    if (person.sex !== 'f') {
      continue;
    }

    const children = people
      .find(child => checkForRelativness(child, person));

    if (!children && withChildren) {
      continue;
    }

    totalAge += person.died - person.born;
    fitWomanCounter++;
  }

  return +(totalAge / fitWomanCounter);
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
  let ageDiffsSum = 0;
  let fitPairsCount = 0;

  for (const person of people) {
    if (person.sex !== 'f') {
      continue;
    }

    const children = people
      .filter(child => checkForRelativness(child, person, onlyWithSon));

    if (!children) {
      continue;
    }

    ageDiffsSum += children.reduce((sum, child) => {
      return sum + (child.born - person.born);
    }, 0);

    fitPairsCount += children.length;
  }

  return +(ageDiffsSum / fitPairsCount).toFixed(2);
}

function checkForRelativness(child, person, onlyWithSon = undefined) {
  if (onlyWithSon && child.sex !== 'm') {
    return false;
  }

  return child.mother === person.name;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

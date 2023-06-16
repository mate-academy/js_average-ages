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
  let fitManCounter = 0;

  const totalAge = people.reduce((total, person) => {
    if (person.sex !== 'm') {
      return total;
    }

    const currentAge = person.died - person.born;

    if (!century) {
      fitManCounter++;

      return total + currentAge;
    }

    const dieCentury = Math.ceil(person.died / 100);

    if (dieCentury === century) {
      fitManCounter++;

      return total + currentAge;
    }

    return total;
  }, 0);

  return +(totalAge / fitManCounter).toFixed(2);
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
  let fitWomanCounter = 0;

  const totalAge = people.reduce((total, person) => {
    if (person.sex !== 'f') {
      return total;
    }

    const children = people
      .find(child => checkForRelativness(child, person));

    if (!children && withChildren) {
      return total;
    }

    fitWomanCounter++;

    return total + person.died - person.born;
  }, 0);

  return +(totalAge / fitWomanCounter).toFixed(2);
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
  let validPairsCount = 0;
  const totalAgeDiffSum = people.reduce((sum, person) => {
    if (person.sex !== 'f') {
      return sum;
    }

    const familyDifference = people
      .filter(child =>
        checkForRelativness(child, person, onlyWithSon)
      )
      .reduce((familyDiff, child) => {
        validPairsCount++;

        return familyDiff + child.born - person.born;
      }, 0);

    return sum + familyDifference;
  }, 0);

  return +(totalAgeDiffSum / validPairsCount).toFixed(2);
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

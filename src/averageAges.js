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

function filterPeople(people, options) {
  const { sex, century, withChildren, onlyWithSon } = options;

  return people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (century && Math.ceil(person.died / 100) !== century) {
      return false;
    }

    if (withChildren && !people.some(child => child.mother === person.name)) {
      return false;
    }

    if (onlyWithSon && (person.sex !== 'm'
    || !people.some(mom => mom.name === person.mother))) {
      return false;
    }

    return true;
  });
}

function calculateMenAverageAge(people, century) {
  const manFiltered = filterPeople(people, {
    sex: 'm',
    century,
  });

  const manTotalAge = manFiltered.reduce((acum, man) =>
    acum + (man.died - man.born), 0);

  const manAverageAge = manTotalAge / manFiltered.length;

  return manAverageAge;
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
  const womanFiltered = filterPeople(people, {
    sex: 'f',
    withChildren,
  });

  const womanTotalAge = womanFiltered.reduce((acum, value) =>
    acum + (value.died - value.born), 0);

  const womanAverageAge = womanTotalAge / womanFiltered.length;

  return womanAverageAge;
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
  const kids = filterPeople(people, { onlyWithSon });

  let sumAgeDifference = 0;
  let numKidsWithMother = 0;

  kids.forEach(kid => {
    const mother = people.find(woman => woman.name === kid.mother);

    if (mother) {
      const ageDifference = kid.born - mother.born;

      sumAgeDifference += ageDifference;
      numKidsWithMother += 1;
    }
  });

  const averageAgeDiff = numKidsWithMother > 0
    ? sumAgeDifference / numKidsWithMother : 0;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

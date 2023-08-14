'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
const MALE = 'm';
const FEMALE = 'f';
const CENTURY_DIVISOR = 100;

function countAverageAge(selectedGroup) {
  return selectedGroup
    .reduce((ageSum, person) => ageSum + person.died - person.born, 0);
}

function calculateMenAverageAge(people, century) {
  const selectedMenGroup = people
    .filter(person => person.sex === MALE
      && (century === undefined
      || century === Math.ceil(person.died / CENTURY_DIVISOR)));
  const menAverageAge = countAverageAge(selectedMenGroup);

  return menAverageAge / selectedMenGroup.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let selectedWomenGroup = people
    .filter(person => person.sex === FEMALE);

  if (withChildren) {
    selectedWomenGroup = selectedWomenGroup
      .filter(mom => people.some(child => child.mother === mom.name));
  }

  const womenAverageAge = countAverageAge(selectedWomenGroup);

  return womenAverageAge / selectedWomenGroup.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const selectedMothersGroup = people
    .filter(mom => people.some(child => child.mother === mom.name));
  let selectedChildrenGroup = people
    .filter(child => selectedMothersGroup
      .some(mom => mom.name === child.mother));

  if (onlyWithSon) {
    selectedChildrenGroup = selectedChildrenGroup
      .filter(child => child.sex === MALE);
  }

  const ageDifferenceSum = selectedChildrenGroup
    .reduce((diffSum, child) => {
      const mother = selectedMothersGroup
        .find(mom => mom.name === child.mother);
      const ageDiff = child.born - mother.born;

      return diffSum + ageDiff;
    }, 0);

  return ageDifferenceSum / selectedChildrenGroup.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

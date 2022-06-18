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
  const isMan = findSex(people, 'm');
  const manCentury = isMan
    .filter(person => Math.ceil(person.died / 100) === century);

  return findAverageAge(manCentury) || findAverageAge(isMan);
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
  const isWoman = findSex(people, 'f');
  const hasChildren = people
    .filter(mother => people.some(baby => baby.mother === mother.name));

  if (withChildren) {
    return findAverageAge(hasChildren);
  }

  return findAverageAge(isWoman);
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
  const children = people
    .filter(baby => people.some(mother => mother.name === baby.mother));

  const difAge = findDiffAge(children, people);

  if (onlyWithSon) {
    const sons = findSex(children, 'm');
    const difAgeSons = findDiffAge(sons, people);

    return findMiddleAge(difAgeSons);
  }

  return findMiddleAge(difAge);
}

// Auxiliary functions

function findSex(listPeople, sex) {
  return listPeople.filter(person => person.sex === sex);
}

function findAverageAge(listPeople) {
  return listPeople
    .map(person => person.died - person.born)
    .reduce((sum, n) => sum + n, 0) / listPeople.length;
}

function findMiddleAge(agePeople) {
  return agePeople.reduce((sum, n) => sum + n, 0) / agePeople.length;
}

function findDiffAge(listPeople, people) {
  return listPeople
    .map(baby => baby.born - people
      .find(person => person.name === baby.mother).born);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

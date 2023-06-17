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
function calculateMenAverageAge(people, century = null) {
  let menOnly = filterPersonSex(people, 'm');

  if (century !== null) {
    menOnly = menOnly.filter(man => (
      century === Math.ceil(man.died / 100)
    ));
  }

  const CALCULATED_MEN_AGE = sumAge(menOnly);

  return calculateAverageAge(CALCULATED_MEN_AGE, menOnly);
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
function calculateWomenAverageAge(people, withChildren = false) {
  let womenOnly = filterPersonSex(people, 'f');

  if (withChildren) {
    womenOnly = filterMothersNames(womenOnly, getMothersNames(people));
  }

  const CALCULATED_WOMEN_AGE = sumAge(womenOnly);

  return calculateAverageAge(CALCULATED_WOMEN_AGE, womenOnly);
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let children = people.filter(person => person.mother !== null);

  if (onlyWithSon) {
    children = filterPersonSex(children, 'm');
  }

  const womenOnly = filterPersonSex(people, 'f');
  const mothers = filterMothersNames(womenOnly, getMothersNames(children));

  children = children.filter(child => (
    mothers.some(mother => mother.name === child.mother)
  ));

  const CALCULATED_AVERAGE_AGE_DIFFERENCE = sumAgeDiff(children, mothers);

  return calculateAverageAge(CALCULATED_AVERAGE_AGE_DIFFERENCE, children);
}

function filterPersonSex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function sumAge(people) {
  return people.reduce((sum, person) => (
    sum + (person.died - person.born)
  ), 0);
}

function calculateAverageAge(calculatedAge, people) {
  return Math.round(calculatedAge / people.length * 100) / 100;
}

function getMothersNames(people) {
  return people.map(person => person.mother);
}

function filterMothersNames(mothers, mothersNames) {
  return mothers.filter(mother => mothersNames.includes(mother.name));
}

function sumAgeDiff(children, mothers) {
  return children
    .map(child => (
      child.born - mothers.find(mother => mother.name === child.mother).born)
    )
    .reduce((sum, age) => sum + age, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

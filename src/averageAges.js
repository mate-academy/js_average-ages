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
function calculateMenAverageAge(people, century = false) {
  const males
    = filterPeople(
      people,
      century,
      male => male.sex === 'm' && Math.ceil(male.died / 100) === century,
      male => male.sex === 'm');

  return calculateAverage(males);
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
  // write code here
  const females
    = filterPeople(
      people,
      withChildren,
      female => people.find(man => man.mother === female.name),
      female => female.sex === 'f');

  return calculateAverage(females);
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
  const children
    = filterPeople(
      people,
      onlyWithSon,
      child => people.some(person => person.name === child.mother)
      && child.sex === 'm',
      child => people.some(person => person.name === child.mother));

  return children.reduce((accumulator, current) =>
    accumulator + current.born
      - (people.find((mother) => mother.name === current.mother)).born
  , 0) / children.length;
}

function filterPeople(people, flag, flagIsTrue, flagIsfalse) {
  return people.filter(person =>
    flag
      ? flagIsTrue(person)
      : flagIsfalse(person)
  );
}

function calculateAverage(people) {
  return people.reduce((accumulator, currentValue) =>
    (accumulator + (currentValue.died - currentValue.born))
  , 0) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

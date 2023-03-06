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
  let menInCentury = {};

  if (arguments.length === 1) {
    menInCentury = people.filter(
      person => person.sex === 'm');
  } else {
    menInCentury = people.filter(
      person => person.sex === 'm' && (
        Math.ceil(person.died / 100) === century));
  }

  const sumOfAges = menInCentury.reduce(
    (sum, person) => sum + person.died - person.born, 0);

  return sumOfAges / menInCentury.length;
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
  let womenInCentury = {};

  if (withChildren) {
    womenInCentury = people.filter(
      person => person.sex === 'f' && people.some(
        children => children.mother === person.name));
  } else {
    womenInCentury = people.filter(
      person => person.sex === 'f');
  }

  const sumOfAges = womenInCentury.reduce(
    (sum, person) => sum + person.died - person.born, 0);

  return sumOfAges / womenInCentury.length;
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
  let mothers = {};
  let childsCount = 0;
  let sumDifferences = 0;
  let childs;

  mothers = people.filter(
    person => person.sex === 'f'
      && people.some(
        children => children.mother === person.name));

  if (onlyWithSon) {
    childs = (person) => people.filter(
      children => children.mother === person.name
        && children.sex === 'm');
  } else {
    childs = (person) => people.filter(
      children => children.mother === person.name);
  }

  for (const mother of mothers) {
    mother.childs = childs(mother);

    for (const children of mother.childs) {
      sumDifferences += children.born - mother.born;
      childsCount++;
    }
  }

  return sumDifferences / childsCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

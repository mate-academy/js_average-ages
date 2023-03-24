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
  const men = century ? people.filter(
    man => man.sex === 'm' && Math.ceil(man.died / 100) === century)
    : people.filter(man => man.sex === 'm');

  return men.reduce(
    (sumOfAges, man) => sumOfAges + (man.died - man.born), 0) / men.length;
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
  const women = people.filter(person => person.sex === 'f');

  const mothers = people.map(
    person => person.mother).filter(mother => mother !== null);

  const isWithChildren = withChildren ? people.filter(
    person => mothers.includes(person.name)) : women;

  return isWithChildren.reduce((sumOfAges, mother) => sumOfAges + (
    mother.died - mother.born), 0) / isWithChildren.length;
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
  const children = people.filter(
    person => person.mother && people.some(
      subject => subject.name === person.mother));

  const isOnlyWithSon = onlyWithSon ? children.filter(
    child => child.sex === 'm') : children;

  const differenceAge = isOnlyWithSon.map(
    son => son.born - people.find(
      person => person.name === son.mother).born);

  return differenceAge.reduce(
    (sumOfDifferences, differencesBetweenAges) =>
      sumOfDifferences + differencesBetweenAges, 0) / differenceAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

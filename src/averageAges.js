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
  const allMen = people.filter(person => person.sex === 'm');
  const menCentury = allMen
    .filter(person => Math.ceil(person.died / 100) === century);

  const averageAgeWhithCentury = menCentury
    .map(person => person.died - person.born)
    .reduce((firstPerson, secondPerson) =>
      firstPerson + secondPerson, 0) / menCentury.length;

  const averageAgeWithoutCentury = allMen
    .map(person => person.died - person.born)
    .reduce((firstPerson, secondPerson) =>
      firstPerson + secondPerson, 0) / allMen.length;

  return averageAgeWhithCentury || averageAgeWithoutCentury;
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
  const allWomen = people.filter(person => person.sex === 'f');
  const allWomenWithChildren = allWomen
    .filter(mother => people.some(kid => kid.mother === mother.name));

  const averageAgeWithChildren = allWomenWithChildren
    .map(person => person.died - person.born)
    .reduce((firstPerson, secondPerson) =>
      firstPerson + secondPerson, 0) / allWomenWithChildren.length;

  const averageAgeWithoutChildren = allWomen
    .map(person => person.died - person.born)
    .reduce((firstPerson, secondPerson) =>
      firstPerson + secondPerson, 0) / allWomen.length;

  return withChildren
    ? averageAgeWithChildren
    : averageAgeWithoutChildren;
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
    .filter(kid => people.some(mother => kid.mother === mother.name));

  const sons = children.filter(son => son.sex === 'm');

  const ageDifferentChildren = children
    .map(kid => kid.born - people
      .find(mother => mother.name === kid.mother).born);

  const ageDifferentSons = sons
    .map(kid => kid.born - people
      .find(mother => mother.name === kid.mother).born);

  const averageDifferentAgeWithoutSon = ageDifferentChildren
    .reduce((firstDifferent, secondDifferent) =>
      firstDifferent + secondDifferent, 0) / children.length;

  const averageDifferentAgeWithSon = ageDifferentSons
    .reduce((firstDifferent, secondDifferent) =>
      firstDifferent + secondDifferent, 0) / sons.length;

  return onlyWithSon
    ? averageDifferentAgeWithSon
    : averageDifferentAgeWithoutSon;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

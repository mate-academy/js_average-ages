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
function CountAverageAge(list) {
  const ageSum = list.reduce(
    (sum, currPerson) => sum + (currPerson.died - currPerson.born), 0);
  const averageAge = ageSum / list.length;

  return Math.round(averageAge * 100, 2) / 100;
}

function findGender(list, gender) {
  return list.filter(person => person.sex === gender);
}

function findAverageAgeDiff(list) {
  const ageDiffSum = list.reduce(
    (sum, currPerson) => sum + (currPerson.born - currPerson.mother.born), 0);
  const averageAgeDiff = ageDiffSum / list.length;

  return Math.round(averageAgeDiff * 100, 2) / 100;
}

function calculateMenAverageAge(people, century) {
  const men = findGender(people, 'm');
  const menList = century
    ? men.filter(man => (
      Math.ceil(man.died / 100) === century))
    : men;

  return CountAverageAge(menList);
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
  const women = findGender(people, 'f');
  const womenList = (withChildren)
    ? women.filter(woman => (
      people.some(person => (
        person.mother === woman.name))))
    : women;

  return CountAverageAge(womenList);
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
  const women = findGender(people, 'f');
  const children = people.filter(person => (
    person.mother = women.find(woman => (
      person.mother === woman.name))));

  const sons = children.filter(child => (
    child.sex === 'm'));

  return onlyWithSon
    ? findAverageAgeDiff(sons)
    : findAverageAgeDiff(children);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

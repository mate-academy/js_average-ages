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
function filterBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function getAverageAge(people) {
  const sumOfAge = people.reduce((x, year) => (
    x + (year.died - year.born)
  ), 0);

  return sumOfAge / people.length;
}

function calculateMenAverageAge(people, century) {
  let peopleCopy;

  century
    ? peopleCopy = [...people].filter(person => (
      Math.ceil(person.died / 100) === century
    ))
    : peopleCopy = [...people];

  const menPeople = filterBySex(peopleCopy, 'm');

  const menAverageAge = getAverageAge(menPeople);

  return menAverageAge;
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
  let peopleCopy;

  withChildren
    ? peopleCopy = [...people].filter(mother => (
      people.map(child => child.mother)).includes(mother.name))
    : peopleCopy = [...people];

  const womenPeople = filterBySex(peopleCopy, 'f');

  const womenAverageAge = getAverageAge(womenPeople);

  return womenAverageAge;
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
  const maleChild = filterBySex(people, 'm');

  const womenWithChildren = onlyWithSon
    ? maleChild.filter(child => (people.find(
      person => child.mother === person.name)))
    : people.filter(child => (people.find(
      person => child.mother === person.name)));

  const ageSum = womenWithChildren.map(child => (
    child.born - people.find(person => (
      child.mother === person.name)).born));

  const ageDifference = ageSum.reduce((sum, n) => (
    sum + n
  ), 0) / ageSum.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

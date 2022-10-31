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
  const male = arguments.length < 2
    ? filteredByGender(people, 'm')
    : filteredByGender(people, 'm').filter(
      obj => Math.ceil(obj.died / 100) === century);

  return getAverageAge(male);
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
  const female = arguments.length < 2
    ? filteredByGender(people, 'f')
    : filteredByGender(people, 'f').filter(woman => (
      people.find(person => person.mother === woman.name)));

  return getAverageAge(female);
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
  const children = !onlyWithSon
    ? people.filter(child => (
      people.find(
        person => child.mother === person.name)
    ))
    : people.filter(child => (
      people.find(
        person => child.mother === person.name) && child.sex === 'm'
    ));

  const ageDifference = children.map(
    child => (
      child.born - people.find(person => (
        person.name === child.mother)).born));

  return ageDifference.reduce((a, b) => a + b, 0) / ageDifference.length;
}

function filteredByGender(arr, gender) {
  return arr.filter(obj => obj.sex === gender);
}

function getAverageAge(arrayOfObjects) {
  const ages = arrayOfObjects.map((obj) => obj.died - obj.born);
  const averageAge = (ages.reduce(
    (age1, age2) => age1 + age2, 0)) / ages.length;

  return +averageAge.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

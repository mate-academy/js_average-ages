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
 *
 *
 */

function calculateMenAverageAge(people, century = false) {
  const getArrayOfMen = century
    ? people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const getMensLifeArray = getArrayOfMen.map(person =>
    person.died - person.born);

  const sumOfManAge = getMensLifeArray.reduce((total, actual) =>
    total + actual);

  return +(sumOfManAge / getMensLifeArray.length).toFixed(2);
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
  const getArrayOfWoman = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const getWomansLifeArray = getArrayOfWoman.map(person =>
    person.died - person.born);

  const sumOfWomanAge = getWomansLifeArray.reduce((total, actual) =>
    total + actual);

  return +(sumOfWomanAge / getWomansLifeArray.length).toFixed(2);
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
  const getArrayOfChildren = onlyWithSon
    ? people.filter(child =>
      child.sex === 'm'
      && people.some(mother => child.mother === mother.name))
    : people.filter(child => people.some(mother =>
      child.mother === mother.name));

  const getArrayOfMothers = getArrayOfChildren.map(children =>
    people.filter(mother => children.mother === mother.name)).flat();

  const sumDiff = getArrayOfMothers.reduce((total, currentMother, index) => {
    const currentChild = getArrayOfChildren[index];

    return total + (currentChild.born - currentMother.born);
  }, 0);

  return +(sumDiff / getArrayOfChildren.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

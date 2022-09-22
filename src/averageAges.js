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
  const menList = [...people].filter(person => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  ));

  const sumOfAge = menList.reduce((sum, currentMan) => {
    const currentManAge = currentMan.died - currentMan.born;

    return sum + currentManAge;
  }, 0);

  const averageAge = sumOfAge / menList.length;

  return averageAge;
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
  const womenList = [...people].filter(person => (
    withChildren
      ? people.some(human => human.mother === person.name)
      : person.sex === 'f'
  ));

  const sumOfAge = womenList.reduce((sum, currentWoman) => {
    const currentWomanAge = currentWoman.died - currentWoman.born;

    return sum + currentWomanAge;
  }, 0);

  const averageAge = sumOfAge / womenList.length;

  return averageAge;
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
  const childrenList = [...people].filter(person => (
    onlyWithSon
      ? people.some(woman => woman.name === person.mother
        && person.sex === 'm')
      : people.some(woman => woman.name === person.mother)
  ));

  const ageDifferenceList = childrenList.map(child => {
    const ageDifference = child.born - people.find(woman => (
      woman.name === child.mother
    )).born;

    return ageDifference;
  });

  const AgeDifference = ageDifferenceList.reduce((sum, currentDiff) => (
    sum + currentDiff)
  , 0);

  const averageAgeDifference = AgeDifference / ageDifferenceList.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

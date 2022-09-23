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

// const calcAverageAgeValue = function(sum, currentPerson) {
//   const currentPersonAge = currentPerson.died - currentPerson.born;

//   return sum + currentPersonAge;
// };

const calculateAverageAge = (peopleList) => {
  const sumOfAge = peopleList.reduce((sum, person) => {
    const currentManAge = person.died - person.born;

    return sum + currentManAge;
  }, 0);

  return sumOfAge / peopleList.length;
};

function calculateMenAverageAge(people, century) {
  const menList = people.filter(person => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  ));

  const averageAge = calculateAverageAge(menList);

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
  const womenList = people.filter(person => (
    withChildren
      ? people.some(human => human.mother === person.name)
      : person.sex === 'f'
  ));

  const averageAge = calculateAverageAge(womenList);

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
  const childrenList = people.filter(person => (
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

  const ageDifferenceSum = ageDifferenceList.reduce((sum, currentDiff) => (
    sum + currentDiff)
  , 0);

  const averageAgeDifference = ageDifferenceSum / ageDifferenceList.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

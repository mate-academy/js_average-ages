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
  const men = people.filter(
    century
      ? person => {
        const centuryPeopleLiveIn = Math.ceil(person.died / 100) === century;

        return centuryPeopleLiveIn && person.sex === 'm';
      }
      : person => person.sex === 'm');

  return calculateValidAvarageAge(men);
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
  const women = people.filter(
    withChildren
      ? person => {
        const withMother = people.some(child => child.mother === person.name);

        return withMother && person.sex === 'f';
      }
      : person => person.sex === 'f');

  return calculateValidAvarageAge(women);
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
  const ageDifference = onlyWithSon
    ? people.filter(child => child.sex === 'm')
    : people;

  return ageDifference
    .filter(child => people.some(mother => mother.name === child.mother))
    .map(child => {
      return child.born - people.find(mother => {
        return mother.name === child.mother;
      }).born;
    })
    .reduce((sum, elem, index, array) => sum + elem / array.length, 0);
}

function calculateValidAvarageAge(filteredPeople) {
  const averageAge = filteredPeople.reduce((sum, person) => {
    const personAge = person.died - person.born;

    return sum + personAge;
  }, 0);

  return +(averageAge / filteredPeople.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

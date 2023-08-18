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
const MALE = 'm';
const FEMALE = 'f';
const ONE_CENTURY = 100;

function getAverageAges(persons) {
  return persons.reduce((sumAge, person) =>
    sumAge + (person.died - person.born), 0) / persons.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === MALE && (century
    ? Math.ceil(person.died / ONE_CENTURY) === century
    : true));

  const menTotalAge = getAverageAges(men);

  return menTotalAge;
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
  const women = withChildren
    ? people
      .filter(person => person.sex === FEMALE && people
        .some(child => child.mother === person.name))
    : people
      .filter(person => person.sex === FEMALE);

  const averafeWoomanAge = getAverageAges(women);

  return averafeWoomanAge;
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
  const filteredPeople = people.filter(person => {
    const hasMother = people.find(mother => mother.name === person.mother);

    return hasMother && (onlyWithSon ? person.sex === MALE : true);
  });

  const childrenTotalAge = filteredPeople
    .reduce((acc, { born, mother: motherName }) => {
      const motherBirthYear = people
        .find(({ name }) => name === motherName).born;

      if (motherBirthYear) {
        return acc + born - motherBirthYear;
      }

      return acc;
    }, 0);

  return childrenTotalAge / filteredPeople.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

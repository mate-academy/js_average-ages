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
const CENTURY_YEARS = 100;
const MALE_SEX = 'm';
const FEMALE_SEX = 'f';

function calculateTotalAge(filtredPeople) {
  return filtredPeople
    .reduce((sum, person) => sum + (person.died - person.born), 0);
}

function calculateMenAverageAge(people, century) {
  let filtredMen = people.filter(person => person.sex === MALE_SEX);

  if (century !== undefined) {
    filtredMen = filtredMen
      .filter(person => Math.ceil(person.died / CENTURY_YEARS) === century);
  }

  const totalAge = calculateTotalAge(filtredMen);

  return totalAge / filtredMen.length;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  let filtredWomen = people.filter(person => person.sex === FEMALE_SEX);

  if (withChildren) {
    filtredWomen = filtredWomen
      .filter(women => people.some(person => person.mother === women.name));
  }

  const totalAge = calculateTotalAge(filtredWomen);

  return totalAge / filtredWomen.length;
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
  const peopleWithMothers = people.filter((person) => {
    return ((!onlyWithSon || person.sex === MALE_SEX)
      && people.some((mom) => mom.name === person.mother)
    );
  });

  const ageDiff = peopleWithMothers
    .reduce((sum, { born, mother: motherName }) => {
      const motherDateOfBirth = people
        .find(({ name }) => name === motherName);

      return sum + born - motherDateOfBirth.born;
    }, 0);

  return ageDiff / peopleWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

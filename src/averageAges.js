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
const MALE = 'm';
const FEMALE = 'f';
const DIVISOR_FOR_CENTURY = 100;
const ZERO_VALUE = 0;

const calculateAverageAge = (filteredPeople) => {
  return filteredPeople
    .reduce((years, { died, born }) => (
      years + died - born
    ), ZERO_VALUE) / filteredPeople.length || ZERO_VALUE;
};

const calculateMenAverageAge = (people, century) => {
  const menList = people.filter(({ sex, died }) => (
    sex === MALE && (century
      ? Math.ceil(died / DIVISOR_FOR_CENTURY) === century
      : true)
  ));

  return calculateAverageAge(menList);
};

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
  const womanList = people
    .filter(({ sex, name }) => (
      sex === FEMALE && (withChildren
        ? people.some(({ mother }) => mother === name)
        : true)
    ));

  return calculateAverageAge(womanList);
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  const peopleWithMother = people.filter(({ mother, sex }) => (
    (people.some(({ name }) => name === mother)
    && (onlyWithSon
      ? sex === MALE
      : true)
    ))
  );

  const averageAgeDiff = peopleWithMother
    .reduce((sum, { born, mother }) => {
      const motherBorn = people
        .find(({ name }) => name === mother)
        .born;

      return sum + born - motherBorn;
    }, ZERO_VALUE) / peopleWithMother.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

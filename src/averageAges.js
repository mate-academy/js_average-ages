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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const men = people
    .filter((person) => {
      return century
        ? Math.ceil(person.died / 100) === century && person.sex === 'm'
        : person.sex === 'm';
    });

  const lifeDuration = men
    .map((year) => year.died - year.born)
    .reduce((prev, age) => prev + age, 0);

  const averageAge = lifeDuration / men.length;

  averageAge.toFixed(2);

  return +averageAge;
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
  const women = people
    .filter((person) => {
      return !withChildren
        ? person.sex === 'f'
        : person.sex === 'f'
        && people
          .some((p) => p.mother === person.name);
    });

  const lifeDurationWomen = women
    .map((year) => year.died - year.born)
    .reduce((prev, age) => prev + age, 0);

  const avarageAge = lifeDurationWomen / women.length;

  return avarageAge;
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

  // 'Average age difference with son'

  const mothers = people
    .filter((person) => {
      return !onlyWithSon
        ? person.sex === 'f'
        : person.sex === 'f'
        && people.some((p) => p.mother === person.name
          && p.sex === 'm');
    });

  const children = people
    .filter((person) => {
      return !onlyWithSon
        ? person.mother !== null
        : person.sex === 'm'
        && people
          .some((p) => person.mother === p.name);
    });

  const motherAge = children
    .map((child) => {
      const mother = mothers
        .find((person) => person.name === child.mother);

      return mother
        ? child.born - mother.born
        : 0;
    });

  const totalAgeDiff = motherAge.reduce((total, age) => total + age, 0);

  const averageAgeDiff = onlyWithSon
    ? totalAgeDiff / children.length
    : totalAgeDiff / mothers.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const mens = people.filter(({ sex, died }) => sex === 'm'
    && (century ? century === Math.ceil(died / 100) : true));

  return Math.round(((mens.reduce((sum, { born, died }) =>
    sum + (died - born), 0) / mens.length) * 100)) / 100;
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
  if (withChildren) {
    const memsWidthSon = people.filter(({ name, sex }) =>
      sex === 'f' && people
        .some(({ mother }) => mother === name));

    return Math.round(((memsWidthSon.reduce((sum, { born, died }) =>
      sum + (died - born), 0) / memsWidthSon.length) * 100)) / 100;
  }

  const mems = people.filter(({ sex }) => sex === 'f');

  return Math.round(((mems.reduce((sum, { born, died }) =>
    sum + (died - born), 0) / mems.length) * 100)) / 100;
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
  const peopleWithMother = people.filter(person => people
    .some(mother => (
      mother.name === person.mother && (
        onlyWithSon
          ? person.sex === 'm'
          : true
      )
    ))
  );

  const sumOfDifferences = peopleWithMother
    .reduce((sum, { born: personBorn, mother: motherName }) => {
      const motherBorn = people
        .find((person) => person.name === motherName)
        .born;

      return sum + personBorn - motherBorn;
    }, 0);

  return Math.round(((sumOfDifferences / peopleWithMother.length) * 100)) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

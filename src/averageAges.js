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

const SEX_MALE = 'm';
const SEX_FEMALE = 'f';

function calculateAverageAge(array) {
  return array.reduce((acc, { died, born }) => {
    const age = died - born;

    return acc + age;
  }, 0) / array.length;
}

function calculateMenAverageAge(people, century) {
  const filteredMen = century
    ? people.filter(person => person.sex === SEX_MALE
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === SEX_MALE);

  return calculateAverageAge(filteredMen);

  // write code here
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
  const women = people.filter(person => person.sex === SEX_FEMALE);

  const womenArray = withChildren
    ? women.filter(person => people.some(perso => perso.mother === person.name))
    : women;

  return calculateAverageAge(womenArray);
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
  const childrenWithMothers = people.filter(child => {
    return people.find(woman =>
      child.mother === woman.name && (!onlyWithSon || child.sex === SEX_MALE)
    );
  });

  const sumAgeDiffBetween = childrenWithMothers.reduce((sum, child) => {
    const mother = people.find(({ name }) => name === child.mother);
    const ageDiff = child.born - mother.born;

    return sum + ageDiff;
  }, 0);

  return sumAgeDiffBetween / childrenWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men
    = century === undefined
      ? people.filter((person) => person.sex === 'm')
      : people.filter(
        (person) =>
          person.sex === 'm' && Math.ceil(person.died / 100) === century
      );

  return (
    men
      .map((person) => person.died - person.born)
      .reduce((sum, n) => sum + n, 0) / men.length
  );
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
  const hasChild = (woman) =>
    people.some((child) => child.mother === woman.name);

  const women = !withChildren
    ? people.filter((woman) => woman.sex === 'f')
    : people.filter(
      (person) => person.sex === 'f' && hasChild(person) === true
    );

  return (
    women
      .map((person) => person.died - person.born)
      .reduce((sum, n) => sum + n, 0) / women.length
  );
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
  const isMother = (child) => people.some((kid) => kid.name === child.mother);

  const findMother = (child) =>
    people.find((woman) => woman.name === child.mother);

  const children = people.filter((child) =>
    isMother(child) && onlyWithSon ? child.sex === 'm' : isMother(child)
  );

  return (
    children
      .map((child) => child.born - findMother(child).born)
      .reduce((sum, n) => sum + n) / children.length
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

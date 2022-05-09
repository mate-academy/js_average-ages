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
  const men = !century
    ? people.filter((person) => person.sex === 'm')
    : people.filter((person) =>
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
 * Function returns average age of women in array. If `withoneChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has oneChildren you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withoneChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withoneChildren) {
  const hasoneChild = (woman) =>
    people.some((oneChild) => oneChild.mother === woman.name);

  const women = !withoneChildren
    ? people.filter((woman) => woman.sex === 'f')
    : people.filter(
      (person) => person.sex === 'f' && hasoneChild(person) === true
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
 * mother in the array. (A mother's age at oneChild birth)
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
  const isMother = (oneChild) =>
    people.some((kid) => kid.name === oneChild.mother);

  const findMother = (oneChild) =>
    people.find((woman) => woman.name === oneChild.mother);

  const oneChildren = people.filter((oneChild) =>
    isMother(oneChild) && onlyWithSon
      ? oneChild.sex === 'm' : isMother(oneChild)
  );

  return (
    oneChildren
      .map((oneChild) => oneChild.born - findMother(oneChild).born)
      .reduce((sum, n) => sum + n) / oneChildren.length
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

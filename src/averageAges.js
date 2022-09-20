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
  let men = people.filter((person) => person.sex === 'm');

  men = century
    ? men.filter((person) => Math.ceil(person.died / 100) === century)
    : men;

  const sumOfAge = men.reduce((prev, man) => (
    man.died - man.born + prev
  ), 0);

  return sumOfAge / men.length;
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
  let women = people.filter((person) => person.sex === 'f');

  women = withChildren
    ? women.filter((mother) => people.some((person) => (
      mother.name === person.mother
    )))
    : women;

  const sumOfAge = women.reduce((prev, woman) =>
    woman.died - woman.born + prev, 0);

  return sumOfAge / women.length;
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
  const mothers = onlyWithSon
    ? people.filter((mother) => people.some((person) => (
      mother.name === person.mother && person.sex === 'm'
    )))
    : people.filter((mother) => people.some((person) => (
      mother.name === person.mother
    )));

  const children = onlyWithSon
    ? people.filter((person) => (
      mothers.some((mother) => (
        mother.name === person.mother && person.sex === 'm'
      ))))
    : people.filter((person) => (
      mothers.some((mother) => mother.name === person.mother
      )));

  const sumOfAgeDifferences = children.reduce((prev, child) => {
    const mum = (mothers.find((mother) => child.mother === mother.name));

    return child.born - mum.born + prev;
  }, 0);

  // const sumOfAgeDifferences = children.reduce((prev, child) =>
  //   child.born - (people.find((person) =>
  //     child.mother === person.name)).born + prev, 0);

  return sumOfAgeDifferences / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

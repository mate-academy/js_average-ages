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
  const men = people.filter(({ sex, died }) => (
    sex === 'm' && (
      century
        ? Math.ceil(died / 100) === century
        : true
    )
  ));

  const sumOfAges = men.reduce((acc, { born, died }) => {
    return acc + (died - born);
  }, 0);

  return sumOfAges / men.length;
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
  const women = people.filter(({ name, sex }) => {
    const hasChildren = people.some(({ mother }) => mother === name);

    return sex === 'f' && (
      withChildren
        ? hasChildren
        : true
    );
  });

  const sumOfAges = women.reduce((acc, { born, died }) => {
    return acc + (died - born);
  }, 0);

  return sumOfAges / women.length;
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
  const children = people.filter(({ mother, sex }) => (
    people.some(({ name }) => name === mother) && (
      onlyWithSon
        ? sex === 'm'
        : true
    )
  ));

  const differencies = children.reduce(
    (acc, { mother: childMother, born: childBorn }) => {
      const { born: motherBorn } = people
        .find(({ name }) => name === childMother);

      return acc + (childBorn - motherBorn);
    }, 0);

  return differencies / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

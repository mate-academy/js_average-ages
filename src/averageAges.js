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
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting
function calculateMenAverageAge(people, century) {
  const filteredMen = people.filter(({ sex, died }) => {
    return sex === 'm'
      && (century
        ? Math.ceil(died / 100) === century
        : true);
  });

  const averageOfMenAge = filteredMen.reduce((sum, { died, born }) =>
    sum + (died - born), 0);

  return averageOfMenAge / filteredMen.length;
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
  const filteredWomen = people.filter(({ sex, name }) =>
    sex === 'f'
      && (withChildren
        ? people.some(child => child.mother === name)
        : true));
  const averageOfWomenAge = filteredWomen.reduce((sum, { died, born }) =>
    sum + (died - born), 0);

  return averageOfWomenAge / filteredWomen.length;
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
  const filteredChildren = people.filter(({ mother, sex }) =>
    people.some(person => person.name === mother)
    && (onlyWithSon
      ? sex === 'm'
      : true
    ));

  const sumOfDifferences = filteredChildren.reduce((sum, { mother, born }) => {
    const mum = people.find(person => person.name === mother);
    const mothersAge = born - mum.born;

    return sum + mothersAge;
  }, 0);

  return sumOfDifferences / filteredChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

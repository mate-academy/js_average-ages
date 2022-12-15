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
  const men = people.filter(x => x.sex === 'm'
    && (century ? Math.ceil(x.died / 100) === century : !century));

  const avAge = (men.reduce((a, b) => a + b.died, 0)
    - men.reduce((a, b) => a + b.born, 0))
      / men.length;

  return +avAge.toFixed(2);
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
  const women = people.filter(woman => woman.sex === 'f'
    && (withChildren ? people.find(kid => kid.mother === woman.name)
      : !withChildren));

  const avAge = (women.reduce((a, b) => a + b.died, 0)
    - women.reduce((a, b) => a + b.born, 0)) / women.length;

  return +avAge.toFixed(2);
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
  const children = people.filter(person =>
    people.some(mom => mom.name === person.mother)
      && (onlyWithSon ? person.sex === 'm' : !onlyWithSon));

  const ageDiff = children.map(child => {
    const mom = people.find(woman => woman.name === child.mother);

    return child.born - mom.born;
  });

  const average = ageDiff.reduce((a, b) => a + b, 0) / children.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

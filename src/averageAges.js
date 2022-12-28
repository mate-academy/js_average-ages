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
  const men = people.filter(person => person.sex === 'm'
    && (
      century
        ? Math.ceil(person.died / 100) === century
        : !century
    ));
  const menAge = men.map(person => person.died - person.born);
  const menAverage = menAge.reduce((a, b) => a + b);

  return result(menAverage, menAge);
  // return menAverage / menAge.length;
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
  const women = people.filter(person => person.sex === 'f'
    && (
      withChildren
        ? people.find(child => child.mother === person.name)
        : !withChildren
    ));
  const womenAge = women.map(person => person.died - person.born);
  const womenAverage = womenAge.reduce((a, b) => a + b);

  return result(womenAverage, womenAge);
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
  let sum = 0;
  let family = 0;

  people.forEach(mom => {
    people.map(child => (child.mother === mom.name)
    && (
      onlyWithSon
        ? child.sex === 'm'
        : !onlyWithSon
    )
      ? (sum += child.born - mom.born) && (family++)
      : null
    );
  });

  return result(sum, family);
}

const result = (a, b) => (b.length > 3) ? (a / b.length) : (a / b);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

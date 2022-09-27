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
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  const menAge = men.map(man => man.died - man.born);

  const averageAge = menAge.reduce((prev, curr) => prev + curr, 0)
    / menAge.length;

  return averageAge;

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
  const women = people.filter(person => person.sex === 'f');

  const womenWithChildren = women.filter(woman => hasChildren(people, woman));

  const womenAge = !withChildren
    ? women.map(woman => woman.died - woman.born)
    : womenWithChildren.map(woman => woman.died - woman.born);

  const averageAge = womenAge.reduce((prev, curr) => prev + curr, 0)
    / womenAge.length;

  return averageAge;
}

function hasChildren(people, woman) {
  return people.some(person => person.mother === woman.name);
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
  const womenWithChildren = people.filter(woman => hasChildren(people, woman));

  const womenWithSons = womenWithChildren.filter(mother => (
    findChild(people, mother).sex === 'm'));

  const ageDifferences = mothers => mothers.map(mother => {
    const child = findChild(people, mother);

    return child.born - mother.born;
  });

  const averageAgeDiff = onlyWithSon
    ? ageDifferences(womenWithSons).reduce((prev, curr) => prev + curr, 0)
    / womenWithSons.length
    : ageDifferences(womenWithChildren).reduce((prev, curr) => prev + curr, 0)
    / womenWithChildren.length;

  return averageAgeDiff;
}

function findChild(people, mother) {
  return people.find(person => mother.name === person.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

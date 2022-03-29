'use strict';

const peoples = require('./people');

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
  const mans = century ? people.filter((person) => {
    return Math.ceil(person.died / 100) === century && person.sex === 'm';
  }) : people.filter((person) => person.sex === 'm');

  const count = mans.length;

  const mansAge = mans.map((man) => man.died - man.born);

  const callback = (sum, item) => {
    return sum + item;
  };

  const averageMansAge = mansAge.reduce(callback, 0);

  return averageMansAge / count;

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
  const womans = withChildren
    ? people.filter(woman => people.some(child => child.mother === woman.name))
    : people.filter((person) => person.sex === 'f');

  const count = womans.length;

  const womanAge = womans.map((woman) => woman.died - woman.born);

  const callback = (sum, item) => sum + item;

  const averageWomenAge = womanAge.reduce(callback, 0);

  return averageWomenAge / count;
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
  const childs = people.filter(children => onlyWithSon
    ? people.some(mom => mom.name === children.mother && children.sex === 'm')
    : people.some(mom => mom.name === children.mother));

  const count = childs.length;

  const callback = (sum, item) =>
    (sum + (item.born - people.find(person =>
      person.name === item.mother).born));

  const womansAvgAge = (childs.reduce(callback, 0));

  return womansAvgAge / count;
}

calculateAverageAgeDiff(peoples, true);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

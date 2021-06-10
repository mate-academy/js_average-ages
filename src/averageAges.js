'use strict';

// const { filter } = require("./people");

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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let men = people.filter(man => man.sex === 'm');

  if (century !== undefined) {
    men = men.filter(man => Math.ceil(man.died / 100) === century);
  }

  const ages = men.map(man => man.died - man.born);
  const sum = ages.reduce((a, b) => a + b);

  return sum / ages.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(woman => woman.sex === 'f');

  if (withChildren) {
    women = women.filter(woman =>
      people.find(person => person.mother === woman.name));
  }

  const ages = women.map(woman => woman.died - woman.born);
  const sum = ages.reduce((a, b) => a + b);

  return sum / ages.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = people.filter(child =>
    people.find(mom => child.mother === mom.name));

  if (onlyWithSon) {
    children = children.filter(son => son.sex === 'm');
  }

  const ages = children.map(child =>
    child.born - people.find(mom => child.mother === mom.name).born);
  const sum = ages.reduce((a, b) => a + b);

  return sum / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const men = people.filter(person => person.sex === 'm'
    && (century === Math.ceil(person.died / 100) || !century));
  const menAges = men.map(man => man.died - man.born);
  const menAverageAge = menAges.reduce((sum, x) => sum + x, 0) / menAges.length;

  return menAverageAge;
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
  const mothers = people.map(person => person.mother);
  const women = people.filter(person => person.sex === 'f'
    && (mothers.includes(person.name) || !withChildren));
  const womenAges = women.map(woman => woman.died - woman.born);
  const womenAverageAge = womenAges.reduce((sum, x) => sum + x, 0)
    / womenAges.length;

  return womenAverageAge;
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
  const differences = [];

  for (let i = 0; i < people.length; i++) {
    for (let k = 0; k < people.length; k++) {
      if (people[i].mother === people[k].name
          && (people[i].sex === 'm' || !onlyWithSon)) {
        differences.push(people[i].born - people[k].born);
      }
    }
  }

  return differences.reduce((sum, x) => sum + x, 0) / differences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

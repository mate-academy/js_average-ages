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
  const men = people.filter(person => (!century)
    ? person.sex === 'm'
    : person.sex === 'm' && Math.ceil(person.died / 100) === century);
  const menAge = men.map(person => person.died - person.born);

  return averageAge(menAge);
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
  const women = people.filter(person => (!withChildren)
    ? person.sex === 'f'
    : person.sex === 'f' && people
      .find(mother => mother.mother === person.name));
  const womenAge = women.map(person => person.died - person.born);

  return averageAge(womenAge);
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
  const withKids = (onlyWithSon
    ? people.filter(person => person.sex === 'm'
    && people.find(mother => person.mother === mother.name))
    : people.filter(person => people
      .find(mom => person.mother === mom.name)));
  const diffAge = withKids.map(item => item.born
    - people.find(mom => item.mother === mom.name).born);

  return averageAge(diffAge);
}

function averageAge(ages) {
  return ages.reduce((sum, x) => sum + x, 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

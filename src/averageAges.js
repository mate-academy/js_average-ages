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
    && ((Math.ceil(person.died / 100) === century) || (century === undefined)));

  const ages = men.map(person => person.died - person.born);

  const amount = ages.reduce((sum, x) => x + sum, 0);

  return amount / ages.length;
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
  let mothersAge = 0;
  let ages = [];

  withChildren ? women.map(woman =>
    (people.find(person => person.mother === woman.name))
      ? ages.push(woman.died - woman.born) : null)
    : ages = women.map(person => person.died - person.born);

  mothersAge = ages.reduce((sum, x) => x + sum, 0);

  return mothersAge / ages.length;
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
  let diffAge = 0;
  const diffAges = [];

  onlyWithSon ? people.map(woman => {
    people.map(person =>
      ((person.mother === woman.name) && (person.sex === 'm'))
        ? diffAges.push(person.born - woman.born) : null);
  }) : people.map(woman => {
    people.map(person => (person.mother === woman.name)
      ? diffAges.push(person.born - woman.born) : null);
  });

  diffAge = diffAges.reduce((sum, x) => x + sum, 0);

  return diffAge / diffAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const mans = people.filter(person => (person.sex === 'm'
  && century === undefined) || (person.sex === 'm'
  && Math.ceil(person.died / 100) === century));

  const newArr = mans.map((person) => person.died - person.born);

  const averageAge = newArr.reduce((sum, element) => sum + element, 0);

  return averageAge / newArr.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const womans = people.filter(person =>
    withChildren
      ? people.some(child => child.mother === person.name)
      : person.sex === 'f'
  ).map(person => person.died - person.born);

  const averageAge = womans.reduce((sum, element) => sum + element, 0);

  return averageAge / womans.length;
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
  const age = people.filter(person => {
    const childs = people.find(m =>
      onlyWithSon
        ? m.name === person.mother && person.sex === 'm'
        : m.name === person.mother
    );

    person.child = childs;

    return childs;
  }).map(person =>
    person.born - person.child.born);

  const averageAge = age.reduce((sum, element) => sum + element, 0);

  return averageAge / age.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

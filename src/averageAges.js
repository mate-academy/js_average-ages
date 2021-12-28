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
  const filteredMan = century
    ? people.filter(person => person.sex === 'm'
      && (Math.ceil(person.died / 100) === century))
    : people.filter(person => person.sex === 'f');

  const lifeDuration = filteredMan.reduce((prev, cur) =>
    prev + cur.died - cur.born, 0);

  return lifeDuration / filteredMan.length;
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
  const filteredWomen = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  if (filteredWomen.length === 0) {
    return;
  }

  const reduceTimeLive = filteredWomen.reduce((prev, cur) =>
    prev + cur.died - cur.born, 0);

  return reduceTimeLive / filteredWomen.length;
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
  const children = onlyWithSon
    ? people.filter(person => people.some(mother =>
      mother.name === person.mother && person.sex === 'm'
    ))
    : people.filter(person => people.some(name => name.name === person.mother));

  const differenceAge = children.map(child => {
    return child.born - people.find(mom => mom.name === child.mother).born;
  });

  const averageSumAge = differenceAge.reduce((sum, age) => sum + age);

  return averageSumAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

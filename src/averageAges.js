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
  const men = people.filter(person => century
    ? person.sex === 'm' && (century === Math.ceil(person.died / 100))
    : person.sex === 'm'
  );

  const sum = men.reduce((prev, m) => (m.died - m.born) + prev, 0);

  return sum / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mom = people.map(person => person.mother).filter(el => el !== null);

  const women = people.filter(el => withChildren
    ? el.sex === 'f' && (mom.includes(el.name))
    : el.sex === 'f'
  );

  const sum = women.reduce((prev, person) =>
    (person.died - person.born) + prev, 0);

  return sum / women.length;
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
  const children = people.filter(person => onlyWithSon
    ? people.some(mom => mom.name === person.mother) && (person.sex === 'm')
    : people.some(mom => mom.name === person.mother)
  );

  const age = children.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  const sum = age.reduce((prev, year) => year + prev, 0);

  return sum / age.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

'use strict';

// const people = require('./people');

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
// eslint-disable-next-line no-shadow
function calculateMenAverageAge(people, century) {
  const men = people.filter(user => century
    ? user.sex === 'm' && Math.ceil(user.died / 100) === century
    : user.sex === 'm'
  );

  const averageAge = men.reduce((sum, user) => (
    sum + (user.died - user.born
    )), 0);

  return averageAge / men.length;
};

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
// eslint-disable-next-line no-shadow
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(user => {
    const isMother = people.find(child => child.mother === user.name);

    return withChildren
      ? isMother
      : user.sex === 'f';
  });

  const averageWmenAge = women.reduce(
    (sum, user) => sum + (user.died - user.born), 0
  );

  return averageWmenAge / women.length;
};

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
// eslint-disable-next-line no-shadow
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people.filter(kid => kid.sex === 'm'
    && people.find(mother => mother.name === kid.mother))
    : people.filter(kid => people.find(mother => mother.name === kid.mother));

  const ageDiff = children.map(child => child.born - people.find(
    mother => mother.name === child.mother).born);

  return ageDiff.reduce((sum, age) => sum + age, 0) / ageDiff.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

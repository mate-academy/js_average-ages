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
  const man = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');
  const ageLife = man.map(person => person.died - person.born);
  const sum = ageLife.reduce((x, y) => x + y, 0);

  return sum / ageLife.length;
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
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && people.find(child => person.name === child.mother)
    : person.sex === 'f');
  const ageLife = women.map(person => person.died - person.born);
  const sum = ageLife.reduce((x, y) => x + y, 0);

  return sum / ageLife.length;
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
  const sort = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.find(mother => mother.name === person.mother)
    : people.find(mother => mother.name === person.mother));

  const ageLife = sort.map(kid =>
    kid.born - people.find(mother => mother.name === kid.mother).born);

  const sum = ageLife.reduce((x, y) => x + y, 0);

  return sum / ageLife.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

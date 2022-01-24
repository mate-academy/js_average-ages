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
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100)
    === century
    : person.sex === 'm'
  );

  return men.map(person =>
    person.died - person.born).reduce((sum, x) => sum + x) / men.length;
}
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && hasChildren(people, person)
    : person.sex === 'f'
  );

  return women.map(person =>
    person.died - person.born).reduce((sum, x) => sum + x) / women.length;
}

function hasChildren(people, mother) {
  return people.some(person => person.mother === mother.name);
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
    ? person.sex === 'm' && hasMother(people, person.mother)
    : hasMother(people, person.mother)
  );

  const difference = children.map(child =>
    child.born - motherBorn(people, child.mother));

  return difference.reduce((sum, x) => sum + x) / children.length;
}

function hasMother(people, motherName) {
  return people.some(person => person.name === motherName);
}

function motherBorn(people, motherName) {
  const mother = people.find(person => person.name === motherName);

  return mother.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

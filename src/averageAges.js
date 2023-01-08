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
  let men;

  (arguments.length < 2) ? (men = people.filter(person => person.sex === 'm'))
    : (men = people.filter(person => (person.sex === 'm')
  && (Math.ceil(person.died / 100) === century)));

  return men.reduce((a, b) => a + b.died - b.born, 0) / men.length;
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
  let women;

  (arguments.length < 2) ? (women = people.filter(person => person.sex === 'f'))
    : (women = people.filter(woman => (woman.sex === 'f')
  && people.some(person => person.mother === woman.name)));

  return women.reduce((a, b) => a + b.died - b.born, 0) / women.length;
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
  let childrens = people.filter(person => person.mother !== 0
    && people.some(mother => mother.name === person.mother));

  if (arguments.length === 2) {
    childrens = childrens.filter(children => children.sex === 'm');
  };

  const mothers = (childrens.map(child =>
    people.find(mother => mother.name === child.mother)));

  const ageDiff = childrens.map((child, index) =>
    child.born - mothers[index].born);

  return ageDiff.reduce((a, b) => a + b, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

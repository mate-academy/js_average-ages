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
  const men = century
    ? people.filter(item => item.sex === 'm'
      && Math.ceil(item.died / 100) === century)
    : people.filter(item => item.sex === 'm');

  return men.reduce((acc, rec) => {
    return acc + (rec.died - rec.born);
  }, 0) / men.length;
};
// write code here
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
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = people.filter(x => !withChildren
    ? x.sex === 'f'
    : people.some(child => child.mother === x.name));

  return women.map(a => a.died - a.born)
    .reduce((prev, y) => prev + y, 0) / women.length;
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
  const boys = people.filter(son =>
    onlyWithSon
      ? son.sex === 'm' && people.some(person => person.name === son.mother)
      : people.some(person => person.name === son.mother)
  );
  const diff = boys.map(person => person.born - people.find(
    boy => person.mother === boy.name).born);

  return diff.reduce((sum, person) => sum + person, 0) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

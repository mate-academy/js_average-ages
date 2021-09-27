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

  const men = people.filter(person => person.sex === 'm');
  const menDiedInCentury = men.filter(man =>
    Math.ceil(man.died / 100) === century);

  return !century
    ? men.reduce((sum, man) => sum + (man.died - man.born), 0) / men.length
    : menDiedInCentury.reduce((sum, man) =>
      sum + (man.died - man.born), 0) / menDiedInCentury.length;
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
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = women.filter(woman =>
    people.find(person => person.mother === woman.name));

  return !withChildren
    ? women.reduce((sum, woman) =>
      sum + (woman.died - woman.born), 0) / women.length
    : womenWithChildren.reduce((sum, woman) =>
      sum + (woman.died - woman.born), 0) / womenWithChildren.length;
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
  const mother = people.filter(onlyWithSon
    ? children => people.some(person =>
      person.name === children.mother) && children.sex === 'm'
    : children => people.find(person =>
      (person.name === children.mother)));

  const motherAge = mother.map(women =>
    (women.born - people.find(person =>
      person.name === women.mother).born));

  const age = motherAge.reduce((acc, element) =>
    acc + element) / motherAge.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

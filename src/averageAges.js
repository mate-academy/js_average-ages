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
  const men = people.filter(person => person.sex === 'm');
  const agesOfMen = century
    ? (men.filter(man => Math.ceil(man.died / 100) === century)
      .map(man => man.died - man.born))
    : men.map(man => man.died - man.born);

  return (agesOfMen.reduce((a, b) => a + b) / agesOfMen.length);
}
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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

  const agesOfWomen = withChildren
    ? women.filter(woman => (people
      .find(person => person.mother === woman.name)))
      .map(mother => mother.died - mother.born)
    : women.map(el => el.died - el.born);

  return (agesOfWomen.reduce((a, b) => a + b) / agesOfWomen.length);
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
    ? people.some(mother => mother.name === person.mother && person.sex === 'm')
    : people.find(mother => mother.name === person.mother)
  );

  const agesOfMothers = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  return agesOfMothers.reduce((a, b) => a + b) / agesOfMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

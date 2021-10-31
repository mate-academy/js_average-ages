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
  let copyPeople = [...people];

  century && (copyPeople = copyPeople.filter(el =>
    Math.ceil(el.died / 100) === century));

  const menFiltered = copyPeople.filter(el =>
    el.sex === 'm').map(el => el.died - el.born);
  const averageMenAge = menFiltered.reduce((total, amount) =>
    total + amount, 0) / menFiltered.length;

  return averageMenAge;
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
  const women = people.filter(person =>
    withChildren
      ? person.sex === 'f' && people.some(el =>
        el.mother === person.name)
      : person.sex === 'f');

  return women.reduce((arr, curr) =>
    arr + (curr.died - curr.born), 0) / women.length;
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
  const child = people.filter(el =>
    onlyWithSon
      ? el.mother && el.sex === 'm'
      : el.mother);
  const mothers = people.filter(el =>
    people.some(person =>
      person.mother === el.name));
  const mothersWithSons = child.filter(el =>
    mothers.some(mother =>
      el.mother === mother.name));
  const averageAges = mothersWithSons.reduce((sum, curr) =>
  sum + (curr.born - people.find(el =>
    curr.mother === el.name).born), 0) / mothersWithSons.length;

  return averageAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

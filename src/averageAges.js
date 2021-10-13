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
  const isMan = (person) => person.sex === 'm';
  const isManBornInCentury = (person) => person.sex === 'm'
      && Math.ceil(person.died / 100) === century;

  const men = people.filter(century ? isManBornInCentury : isMan);

  const sumOfAges = men.reduce((sum, man) => sum + (man.died - man.born), 0);

  return sumOfAges / men.length;
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
  const isWoman = (person) => person.sex === 'f';
  const isWomanWithChildren = (person) => isWoman
  && people.some(some => some.mother === person.name);
  const women = people.filter(withChildren ? isWomanWithChildren : isWoman);
  const sumOfAges = women.reduce((sum, woman) =>
    sum + woman.died - woman.born, 0);

  return sumOfAges / women.length;
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
  const isChild = (person) => people
    .find(mother => person.mother === mother.name);
  const isSon = (person) => people
    .find(mother => person.mother === mother.name)
  && person.sex === 'm';
  const children = people.filter(onlyWithSon ? isSon : isChild);

  const sumOfDiff = children.reduce((sum, child) => sum + (child.born - people
    .find(mother => child.mother === mother.name).born), 0);

  return sumOfDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

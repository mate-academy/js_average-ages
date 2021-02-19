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
  const mans = people.filter(men => men.sex === 'm');
  const averageAgeOfMen = mans.reduce((sum, year) => (sum
    + (year.died - year.born) / mans.length), 0);

  const mansWithCentury = mans.filter(man => Math.ceil(man.died
    / 100) === century);
  const averageAgeOfMenWithCentury = mansWithCentury.reduce((sum, year) => (sum
    + (year.died - year.born) / mansWithCentury.length), 0);

  return (century) ? averageAgeOfMenWithCentury : averageAgeOfMen;
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
  // write code here
  const allWomen = people.filter(person => person.sex === 'f');
  const womenWithChild = allWomen.filter(
    women => people.some(person => person.mother === women.name));

  const averageAgeOfWoman = allWomen.reduce((sum, year) => (sum
    + (year.died - year.born) / allWomen.length), 0);
  const averageAgeOfWomanWithChild = womenWithChild.reduce((sum, year) => (sum
    + (year.died - year.born) / womenWithChild.length), 0);

  return withChildren
    ? averageAgeOfWomanWithChild : averageAgeOfWoman;
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
  // write code here
  const childrens = people.filter(
    person => people.find(mother => person.mother === mother.name)
  );
  const boys = childrens.filter(child => child.sex === 'm');

  const diferense = childrens.reduce((sum, child) => (
    sum + (child.born - people.find(
      mother => child.mother === mother.name
    ).born)), 0) / childrens.length;

  const diferenseWithSon = boys.reduce((sum, child) => (
    sum + (child.born - people.find(
      mother => child.mother === mother.name
    ).born)), 0) / boys.length;

  return onlyWithSon ? diferenseWithSon : diferense;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

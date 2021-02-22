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
  const men = people.filter(
    person => century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );
  const averageAgeOfMen = men.reduce((sum, year) => (sum
    + (year.died - year.born) / men.length), 0);

  return averageAgeOfMen;
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
  const women = people.filter(
    person => withChildren
      ? person.sex === 'f' && people.some(child =>
        child.mother === person.name)
      : person.sex === 'f'
  );

  const averageAge = women.reduce((sum, year) => (sum
    + (year.died - year.born) / women.length), 0);

  return averageAge;
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
  const children = people.filter(
    person => people.find(mother => person.mother === mother.name)
  );
  const boys = children.filter(child => child.sex === 'm');

  function sumOfyears(sum, child) {
    return sum + (child.born - people.find(
      mother => child.mother === mother.name
    ).born);
  }

  const ageDifferense = children.reduce(sumOfyears, 0) / children.length;

  const diferenseWithSon = boys.reduce(sumOfyears, 0) / boys.length;

  return onlyWithSon ? diferenseWithSon : ageDifferense;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

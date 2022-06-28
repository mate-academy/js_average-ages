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
  const men = people.filter(person =>
    century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm'
  );

  const averageMenAge = men.reduce(
    (sum, age) => sum + (age.died - age.born), 0,
  ) / men.length;

  return averageMenAge;
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
  const women = people.filter(person =>
    withChildren
      ? person.sex === 'f' && people.some(
        child => person.name === child.mother
      )
      : person.sex === 'f'
  );

  const averageMenAge = women.reduce(
    (sum, age) => sum + (age.died - age.born), 0,
  ) / women.length;

  return averageMenAge;
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
  const childF = people.filter(child => {
    const hasMom = people.some(person => child.mother === person.name);

    return onlyWithSon
      ? hasMom && child.sex === 'm'
      : hasMom;
  });

  const averageAge = childF.reduce((sum, child) => {
    const mom = people.find(mother => child.mother === mother.name);
    const ageDifference = child.born - mom.born;

    return sum + ageDifference;
  }, 0) / childF.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

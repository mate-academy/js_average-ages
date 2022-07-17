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
  let manArr = people.filter(person => person.sex === 'm');

  if (century !== undefined) {
    manArr = manArr.filter(man => Math.ceil((man.died) / 100) === century);
  }

  const average = manArr.reduce((sum, manAge) =>
    sum + (manAge.died - manAge.born), 0) / manArr.length;

  return average;
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
  // write code here
  let womenArr = people.filter(person => person.sex === 'f');

  if (withChildren !== undefined) {
    womenArr = womenArr.filter(women => {
      return people.some(child => child.mother === women.name);
    });
  }

  const average = womenArr.reduce((sum, women) =>
    sum + (women.died - women.born), 0
  ) / womenArr.length;

  return average;
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
  // write code here
  const womenArr = people.filter(
    mother => mother.sex === 'f' && people.some(
      child => (onlyWithSon ? child.sex === 'm' : true)
        && child.mother === mother.name
    )
  );

  const children = people.filter(
    child => (onlyWithSon ? child.sex === 'm' : true)
      && womenArr.some(mother => mother.name === child.mother)
  )
    .map(
      child => {
        const mom = womenArr.find(
          mother => mother.name === child.mother
        );

        child.bornOfMother = mom.born;

        return child;
      }
    );

  const totalAgeDiff = children.reduce(
    (sum, child) => sum + child.born - child.bornOfMother, 0
  );

  const averageAgeDiff = totalAgeDiff / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

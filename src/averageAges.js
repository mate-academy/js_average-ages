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
  let maleArr = people.filter(person => person.sex === 'm');

  if (century) {
    maleArr = maleArr.filter(male =>
      Math.ceil((male.died - 0.5) / 100) === century);
  }

  const averageAge = maleArr.reduce((sum, maleAge) =>
    sum + (maleAge.died - maleAge.born), 0) / maleArr.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let femaleArr = people.filter(person => person.sex === 'f');

  if (withChildren) {
    femaleArr = femaleArr.filter(female => {
      return people.some(child => child.mother === female.name);
    });
  }

  const averageAge = femaleArr.reduce((sum, female) =>
    sum + (female.died - female.born), 0
  ) / femaleArr.length;

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
  const clonePeople = people.map(person => ({ ...person }));
  const femaleArr = clonePeople.filter(
    mother => mother.sex === 'f' && clonePeople.some(
      child => (onlyWithSon ? child.sex === 'm' : true)
        && child.mother === mother.name
    )
  );

  const children = clonePeople.filter(
    child => (onlyWithSon ? child.sex === 'm' : true)
      && femaleArr.some(mother => mother.name === child.mother)
  )
    .map(
      child => {
        const mom = femaleArr.find(
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

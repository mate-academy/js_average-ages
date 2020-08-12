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
    person => person.sex === 'm'
      && (
        !century
          ? true
          : Math.ceil(person.died / 100) === century
      )
  );

  const menAgeArr = men.map(man => man.died - man.born);

  return menAgeArr.reduce((sum, age) => sum + age, 0) / menAgeArr.length;
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
  // write code here
  const women = people.filter((person, index, all) =>
    person.sex === 'f'
    && (
      withChildren
        ? all.some(someone => someone.mother === person.name)
        : true
    )
  );

  const womenAgeArr = women.map(woman => woman.died - woman.born);

  return womenAgeArr.reduce((sum, age) => sum + age, 0) / womenAgeArr.length;
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
  const mothers = people.filter(
    mother => mother.sex === 'f' && people.some(
      child => (onlyWithSon ? child.sex === 'm' : true)
        && child.mother === mother.name
    )
  );

  const children = people.filter(
    child => (onlyWithSon ? child.sex === 'm' : true)
      && mothers.some(mother => mother.name === child.mother)
  )
    .map(
      child => {
        const currentMother = mothers.find(
          mother => mother.name === child.mother
        );

        child.bornOfMother = currentMother.born;

        return child;
      }
    );

  return children
    .reduce((sum, child) => sum + child.born - child.bornOfMother, 0)
      / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

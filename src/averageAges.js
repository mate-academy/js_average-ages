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
  const males = people
    .filter(
      person =>
        (century === undefined)
          ? person.sex === 'm'
          : person.sex === 'm' && Math.ceil(person.died / 100) === century
    );

  return males.reduce(
    (current, male) => male.died - male.born + current,
    0
  )
    / males.length;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = people
    .filter(
      person =>
        (withChildren === undefined)
          ? person.sex === 'f'
          : person.sex === 'f'
          && people
            .some(
              child =>
                child.mother === person.name
            )
    );

  return women.reduce(
    (current, woman) => woman.died - woman.born + current,
    0
  )
    / women.length;
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
  const children = people
    .filter(
      person =>
        (onlyWithSon === undefined)
          ? people
            .some(mother =>
              person.mother === mother.name)
          : person.sex === 'm'
          && people
            .some(mother =>
              person.mother === mother.name)
    );

  const mothers = people.filter(
    mother => children.some(child => mother.name === child.mother)
  );

  const ageDifference = children.map(
    child => child.born - mothers.find(
      mother => child.mother === mother.name).born
  );

  return ageDifference.reduce(
    (current, age) => age + current,
    0
  )
    / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

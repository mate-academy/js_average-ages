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
  const man = people.filter(person => person.sex === 'm');
  const men = century
    ? man.filter(
      (person) => Math.ceil(person.died / 100) === century
    )
    : man;

  return calculateAverage(men);

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
  const woman = people.filter(person => person.sex === 'f');
  const women = withChildren
    ? woman.filter((mother) =>
      people.find((child) => child.mother === mother.name)
    )
    : woman;

  return calculateAverage(women);
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
  const children = onlyWithSon
    ? people.filter(
      (person) =>
        people.find((mother) => person.mother === mother.name)
          && person.sex === 'm'
    )
    : people.filter((person) =>
      people.find((mother) => person.mother === mother.name)
    );

  const different = children.map(
    (child) =>
      child.born - people.find((mother) => child.mother === mother.name).born
  );

  return different.reduce((acc, el) => acc + el) / different.length;
}
//
//
//
//
//

const calculateAverage = (array) => {
  return array.reduce((a, b) => b.died - b.born + a, 0) / array.length;
};
//
//
//

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

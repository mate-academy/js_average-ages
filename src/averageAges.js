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
  const suitablePeople = people.filter(person => person.sex === 'm'
    && (century > 0 ? Math.ceil(person.died / 100) === century : true));

  return suitablePeople
    .reduce((sum, person) => sum + (person.died - person.born), 0)
    / suitablePeople.length;
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
  const suitablePeople = people.filter(person => person.sex === 'f'
    && (withChildren
      ? people.some(otherPerson => otherPerson.mother === person.name)
      : true
    )
  );

  return suitablePeople
    .reduce((sum, person) => sum + (person.died - person.born), 0)
    / suitablePeople.length;
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
  const suitableMothers = people.filter(person => person.sex === 'f'
    && people.some(otherPerson => otherPerson.mother === person.name)
  );

  const suitableChildren = people
    .filter(person =>
      suitableMothers.some(mother => mother.name === person.mother)
      && (onlyWithSon
        ? person.sex === 'm'
        : true
      )
    );

  const averageAgeDiff = suitableChildren
    .reduce((ageDiffSum, child) =>
      ageDiffSum
      + (child.born
        - (suitableMothers.find(mother => mother.name === child.mother).born)),
    0)
   / suitableChildren.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

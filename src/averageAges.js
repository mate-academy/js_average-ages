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
function averager(people) {
  return people.reduce((prev, curr) =>
    (prev + (curr.died - curr.born)), 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const centuryAges = people.filter(person => century
    ? (person.sex === 'm') && (Math.ceil(person.died / 100) === century)
    : person.sex === 'm'
  );

  return averager(centuryAges);
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
function calculateWomenAverageAge(people, withChildren = false) {
  const female = people.filter(person => withChildren
    ? person.sex === 'f'
      && people.find(child => person.name === child.mother)
    : person.sex === 'f'
  );

  return averager(female);
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
  const children = people.filter(
    onlyWithSon
      ? child => child.mother && child.sex === 'm'
        && people.some(woman => woman.name === child.mother)
      : child => child.mother
        && people.some(woman => woman.name === child.mother)
  );

  const diffAges = children
    .reduce((sum, personA) => sum + personA.born - people
      .find(personB => personB.name === personA.mother).born, 0);

  return diffAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

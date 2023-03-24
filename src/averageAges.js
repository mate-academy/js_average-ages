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
  const men = people.filter(person => person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century));

  const totalAge = men.reduce(
    (acc, person) => acc + (person.died - person.born), 0
  );
  const averageAge = totalAge / men.length;

  return averageAge;
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
  const listOfMother = people.map(person => person.mother);
  const women = people.filter(person => person.sex === 'f'
    && (!withChildren || listOfMother.includes(person.name)));

  const totalAge = women.reduce(
    (acc, person) => acc + (person.died - person.born), 0
  );
  const averageAge = totalAge / women.length;

  return averageAge;
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
  let haveMother = people.filter(child => child.mother
    && people.find(parent => parent.name === child.mother));

  haveMother = onlyWithSon
    ? haveMother.filter(child => child.sex === 'm')
    : haveMother;

  const ageDifferents = haveMother
    .map(person => person.born - people
      .find(parent => parent.name === person.mother).born);

  return ageDifferents
    .reduce((sum, ageDif) => sum + ageDif, 0) / ageDifferents.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

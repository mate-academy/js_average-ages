'use strict';

/**
 *
 * @param {object[]} people
 *
 * @return {number}
 */

function calculateAverageAge(people) {
  const peopleLength = people.length;

  return people
    .map(person => person.died - person.born)
    .reduce((acc, year) => acc + year)
    / peopleLength;
}

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

  const menWhoIsDead = people
    .filter(person => person.sex === 'm'
    && (!century
    || Math.ceil(person.died / 100) === century));

  return calculateAverageAge(menWhoIsDead);
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
 *
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const womenAge = people
    .filter(person => person.sex === 'f'
    && (!withChildren
    || people.some(human => person.name === human.mother)));

  return calculateAverageAge(womenAge);
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
  const childrenWithMother = people.filter(child => {
    const hasMother = people.some(person => person.name === child.mother);
    const isSon = child.sex === 'm';

    return onlyWithSon ? hasMother && isSon : hasMother;
  });

  const AverageAgeDiff = childrenWithMother.reduce((acc, child) => {
    const matherBorn = people
      .find(mother => mother.name === child.mother).born;

    const ageDifference = child.born - matherBorn;

    return acc + ageDifference;
  }, 0);

  console.log(childrenWithMother.length);

  return AverageAgeDiff / childrenWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  let men = people.filter(man => man.sex === 'm');

  if (century) {
    men = men.filter(man => Math.ceil(man.died / 100) === century);
  }

  const sumOfAges = men
    .map(man => man.died - man.born)
    .reduce((sumOfAge, prevSum) => sumOfAge + prevSum);

  return sumOfAges / men.length;
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
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter(woman =>
      people.some(person => person.mother === woman.name));
  }

  const sumOfAges = women
    .map(woman => woman.died - woman.born)
    .reduce((sumOfAge, prevSum) => sumOfAge + prevSum);

  return sumOfAges / women.length;
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
  const mothers = people.filter(person => person.sex === 'f')
    .filter(mother =>
      people.some(person => person.mother === mother.name));

  let children = people.filter(person =>
    mothers.some(mother => person.mother === mother.name));

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  const ageEachDiff = children.map(child =>
    child.born - mothers.find(mother => mother.name === child.mother).born);

  const diffAgeSum = ageEachDiff
    .reduce((sumOfAge, prevSum) => sumOfAge + prevSum);

  return diffAgeSum / ageEachDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

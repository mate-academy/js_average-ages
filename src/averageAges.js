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

  const males = people.filter(man => (century
    ? man.sex === 'm' && (Math.ceil(man.died / 100)) === century
    : man.sex === 'm'));

  const ageMap = males.map(man => man.died - man.born);

  const averageAge = ageMap.reduce((prevMan, currMan) =>
    prevMan + currMan) / ageMap.length;

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

  const withChild = (woman) => people.some(mother =>
    woman.name === mother.mother);

  const women = people.filter(woman => (withChildren
    ? (woman.sex === 'f' && withChild(woman))
    : woman.sex === 'f'));

  const ageMap = women.map(woman => woman.died - woman.born);

  const averageAge = ageMap.reduce((prevWoman, currWoman) =>
    prevWoman + currWoman) / ageMap.length;

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
  const withMother = (child) =>
    people.some(mother => child.mother === mother.name);

  const findMother = (child) =>
    people.find(mother => child.mother === mother.name);

  const children = people.filter(child => (onlyWithSon
    ? (child.sex === 'm' && withMother(child))
    : withMother(child)));

  const ageMap = children.map(child =>
    child.born - findMother(child).born);

  const averageAge = ageMap.reduce((prevWoman, currWoman) =>
    prevWoman + currWoman) / ageMap.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

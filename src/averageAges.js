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
  const checkMen = person => person.sex === 'm';

  const checkCentury = man => Math.ceil(man.died / 100) === century;

  const filteredMen = century === undefined
    ? people.filter(checkMen)
    : people.filter(checkMen).filter(checkCentury);

  const calculateTotalAge = (sum, man) => sum + man.died - man.born;

  const averageAge = Math.round(filteredMen.reduce(calculateTotalAge, 0)
    / filteredMen.length * 100) / 100;

  return averageAge;
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
  const checkWomen = person => person.sex === 'f';

  const checkChildren = woman =>
    people.some(child => child.mother === woman.name);

  const filteredWomen = withChildren === true
    ? people.filter(checkWomen).filter(checkChildren)
    : people.filter(checkWomen);

  const calculateTotalAge = (sum, woman) => sum + woman.died - woman.born;

  const averageAge = Math.round(filteredWomen.reduce(calculateTotalAge, 0)
      / filteredWomen.length * 100) / 100;

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
  const checkMen = person => person.sex === 'm';

  const checkMothers = child =>
    people.some(mother => mother.name === child.mother);

  const findMother = child =>
    people.find(mother => mother.name === child.mother);

  const children = onlyWithSon === true
    ? people.filter(checkMen).filter(checkMothers)
    : people.filter(checkMothers);

  const mothers = children.map(findMother);

  const calculateTotalAgeDiff = (sum, woman, i, women) =>
    sum + children[i].born - women[i].born;

  const averageAgeDiff = Math.round(mothers.reduce(calculateTotalAgeDiff, 0)
      / mothers.length * 100) / 100;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

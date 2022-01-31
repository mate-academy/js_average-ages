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
  const isMan = (person) => (person.sex === 'm');
  const isManWithCenturyOption = (person) => (isMan(person)
    && Math.ceil(person.died / 100) === century);
  const allMen = people.filter(century ? isManWithCenturyOption : isMan);

  return allMen.reduce((sum, man) =>
    sum + (man.died - man.born), 0) / allMen.length;
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
  const isWoman = (person) => (person.sex === 'f');
  const isWomanWithChildren = (person) => (isWoman(person)
    && people.some(child => person.name === child.mother));

  const allWomen = people.filter(withChildren ? isWomanWithChildren : isWoman);

  return allWomen.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0) / allWomen.length;
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
  const isChild = (person) =>
    (people.some(mother => person.mother === mother.name));

  const isSon = (person) => (person.sex === 'm' && isChild(person));

  const children = people.filter(onlyWithSon ? isSon : isChild);

  const mothers = people.filter(person => children.some(kid =>
    kid.mother === person.name));

  const findMother = (kid) => (mothers.find(mother =>
    kid.mother === mother.name));

  return children.reduce((sum, kid) =>
    sum + (kid.born - findMother(kid).born), 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

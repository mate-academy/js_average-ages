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
  const averageAge = 0;
  const male = people.filter(el => (el.sex === 'm'));
  const centuryMan = male.filter(
    el => (Math.ceil(el.died / 100) === century)
  );

  const currentList = century ? centuryMan : male;

  let menAverageAge = currentList.reduce(
    (accumulator, curr) => accumulator + (curr.died - curr.born),
    averageAge);

  menAverageAge /= currentList.length;

  return menAverageAge;
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
  function isMother(element) {
    const checkMother = people.find(el => el.mother === element.name);

    return checkMother !== undefined;
  }

  let currentList;
  const averageAge = 0;
  const woman = people.filter(el => (el.sex === 'f'));
  const mothers = woman.filter(isMother, woman);

  (withChildren === undefined) ? currentList = woman : currentList = mothers;

  let womanAverageAge = currentList.reduce(
    (accum, curr) => accum + (curr.died - curr.born),
    averageAge);

  womanAverageAge /= currentList.length;

  return womanAverageAge;
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
  let result = 0;
  const def = 0;
  let allChildren;
  const all = people.filter((item) => {
    const isMotherName = people.find(el => item.mother === el.name);

    if (isMotherName !== undefined) {
      return item;
    }
  });

  const allSons = people.filter((item) => {
    const isMotherName = people.find(el => (
      item.mother === el.name) && (item.sex === 'm'));

    if (isMotherName) {
      return item;
    }
  });

  (onlyWithSon === undefined) ? allChildren = all : allChildren = allSons;

  const ageDiffArr = allChildren.map((e) => {
    const a = people.find(el => e.mother === el.name);

    return e.born - a.born;
  });

  const ageDiff = ageDiffArr.reduce((prev, next) => prev + next, def);

  const ageDiffChilds = ageDiff / allChildren.length;

  result = ageDiffChilds;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting
function calculateMenAverageAge(people, century) {
  function isMan(x) {
    return x.sex === 'm';
  }

  function isCentury(x) {
    return Math.ceil(x.died / 100) === century;
  }

  const man = people.filter(isMan);

  const manCentury = man.filter(isCentury);

  if (century) {
    return manCentury.reduce((ages, x) => ages
      + (x.died - x.born), 0) / manCentury.length;
  }

  const averageMan = man.reduce((ages, x) => ages
    + (x.died - x.born), 0) / man.length;

  return averageMan;
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
  function isWomen(x) {
    return x.sex === 'f';
  }

  const women = people.filter(isWomen);

  if (withChildren) {
    const momWithChildren = people.filter(mom =>
      people.some(child => child.mother === mom.name));

    return momWithChildren.reduce((age, x) =>
      age + (x.died - x.born), 0) / momWithChildren.length;
  }

  const averageAgeWomen = women.reduce((age, x) => age + (x.died - x.born), 0);

  return averageAgeWomen / women.length;
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
    ? people.filter((child) => people.some((mom) =>
      mom.name === child.mother) && child.sex === 'm')
    : people.filter((child) =>
      people.some((mom) =>
        mom.name === child.mother));

  const aver = children.reduce((acc, child) => acc
    + (child.born - people.find(mom => mom.name === child.mother).born), 0);

  return aver / children.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

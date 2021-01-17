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

  const menArr = people.filter((person) => {
    const isMan = person.sex === 'm';

    return !century
      ? isMan
      : isMan && Math.ceil(person.died / 100) === century;
  });

  const menAgesArr = menArr.map(men => men.died - men.born);

  return menAgesArr.reduce((total, age) => total + age) / menArr.length;
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
  // (arr, bolean) => number
  const femaleArr = people.filter((person) => {
    const isFemale = person.sex === 'f';

    return !withChildren
      ? isFemale
      : isFemale && people.some(child => child.mother === person.name);
  });
  const womanAges = femaleArr.map(year => year.died - year.born);

  return womanAges.reduce((total, age) => total + age) / femaleArr.length;
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
  const childArr = people.filter((person) => {
    const hasMother = people.some(women => women.name === person.mother);

    return !onlyWithSon
      ? hasMother
      : person.sex === 'm' && hasMother;
  });

  const diffAge = childArr.map((child) => {
    const mother = people.find((female) => child.mother === female.name);

    return child.born - mother.born;
  });

  return diffAge.reduce((total, age) => total + age) / childArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

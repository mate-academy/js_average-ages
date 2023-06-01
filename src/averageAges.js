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
  let menArray;

  (arguments.length === 2)
    ? menArray = people.filter((x) =>
      ((x.sex === 'm') && (century === Math.ceil(x.died / 100))))
    : menArray = people.filter((x) => ((x.sex === 'm')));

  const callback = (sum, x) => sum + (x.died - x.born);
  const menAverageAge = menArray.reduce(callback, 0) / menArray.length;

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
  let womenArray;

  (arguments.length === 2)
    ? womenArray = people.filter((x) =>
      ((x.sex === 'f') && people.some(isMother => x.name === isMother.mother)))
    : womenArray = people.filter((x) => ((x.sex === 'f')));

  const callback = (sum, x) => sum + (x.died - x.born);
  const womenAverageAge = womenArray.reduce(callback, 0) / womenArray.length;

  return womenAverageAge;
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
  let childrenArray;

  (arguments.length === 1)
    ? childrenArray = people.filter((x) =>
      (people.some(haveMother => x.mother === haveMother.name)))
    : childrenArray = people.filter((x) =>
      (people.some(haveMother => x.mother === haveMother.name)
      && (x.sex === 'm')));

  const womenNames = childrenArray.map(child => child.mother);
  const womenArray = [];

  womenNames.forEach((x, index) => {
    people.filter((item) => {
      if (x === item.name) {
        womenArray[index] = item;
      }
    });
  });

  const callback = (sum, x) => sum + x.born;
  const sumChildrenBirths = childrenArray.reduce(callback, 0);
  const sumWomenBirths = womenArray.reduce(callback, 0);

  return (sumChildrenBirths - sumWomenBirths) / childrenArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

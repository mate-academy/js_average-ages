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

  const manWithCentery = people.filter(item => {
    return Math.ceil(item.died / 100) === century && item.sex === 'm';
  });

  const manWithoutCentery = people.filter(item => item.sex === 'm');

  const avAgeWithCent = manWithCentery.reduce((a, b) => {
    return a + (b.died - b.born);
  }, 0) / manWithCentery.length;

  const avAgeWithoutCent = manWithoutCentery.reduce((a, b) => {
    return a + (b.died - b.born);
  }, 0) / manWithoutCentery.length;

  return century ? avAgeWithCent : avAgeWithoutCent;
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
  const womanWithoutChildren = people.filter(item => item.sex === 'f');

  const avAgeWomanWithoutCh = womanWithoutChildren.reduce((a, b) => {
    return a + (b.died - b.born);
  }, 0) / womanWithoutChildren.length;

  const mothers = people.map((x) => x.mother);

  const womanWithChildren = people.filter(item => {
    return item.sex === 'f' && mothers.includes(item.name);
  });

  const avAgeWomanWithCh = womanWithChildren.reduce((a, b) => {
    return a + (b.died - b.born);
  }, 0) / womanWithChildren.length;

  return withChildren ? avAgeWomanWithCh : avAgeWomanWithoutCh;
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
  let children = people.filter(
    person => people.find(mother => mother.name === person.mother)
  );

  if (onlyWithSon) {
    children = children.filter((child) => child.sex === 'm');
  }

  const difference = children.map(child => {
    return child.born - people.find(mother =>
      mother.name === child.mother).born;
  });

  const averageDiff = difference.reduce((a, b) => {
    return (a + b);
  }, 0);

  return averageDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

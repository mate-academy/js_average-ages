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
function getAverage(list) {
  const sumOfAges = list.reduce((sum, a) => sum + (a.died - a.born), 0);

  return +(sumOfAges / list.length).toFixed(2);
}

function calculateMenAverageAge(people, century) {
  const list = people.filter(item => item.sex === 'm');

  const maleList = century
    ? list.filter(item => Math.ceil(item.died / 100) === century)
    : list;

  return getAverage(maleList);
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
  const mothers = people.map(person => `${person.mother}`);

  const list = people.filter(item => item.sex === 'f');
  const femaleList = withChildren
    ? list.filter((item) => mothers.some((mum) => mum === item.name))
    : list;

  return getAverage(femaleList);
  // write code here
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
  const children = people.filter((child) => (people.find((mother) =>
    (child.mother === mother.name))));

  const kids = onlyWithSon
    ? children.filter((child) => child.sex === 'm')
    : children;

  const ageDiffList = kids.map((child) => {
    const mum = people.find((mummy) => mummy.name === child.mother);

    return child.born - mum.born;
  });

  const sumOfDiff = ageDiffList.reduce((prev, current) => prev + current, 0);

  const result = +(sumOfDiff / ageDiffList.length).toFixed(2);

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

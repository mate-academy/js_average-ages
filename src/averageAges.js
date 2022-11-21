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
  const list
  = century === undefined
    ? people.filter(item => item.sex === 'm')
    : people.filter(item => item.sex === 'm'
    && Math.ceil(item.died / 100) === century);
  const sumOfAges = list.reduce((sum, a) => sum + (a.died - a.born), 0);

  const averageMan = +(sumOfAges / list.length).toFixed(2);

  return averageMan;
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
  const list
   = withChildren === undefined
     ? people.filter(item => item.sex === 'f')
     : people.filter(item => item.sex === 'f'
     && mothers.some((mum) => mum === item.name));
  const sumOfAges = list.reduce((sum, a) => sum + (a.died - a.born), 0);

  const averageWoman = +(sumOfAges / list.length).toFixed(2);

  return averageWoman;
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
  const kids
  = onlyWithSon === undefined
    ? people.filter((child) => (people.find((mother) =>
      (child.mother === mother.name))))
    : people.filter((child) => (people.find((mother) =>
      (child.mother === mother.name) && (child.sex === 'm'))));

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

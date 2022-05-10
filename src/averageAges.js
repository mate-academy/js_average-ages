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
function calculateMenAverageAge(people, century = 0) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const onlyMan = people.filter(person => person.sex === 'm');
  const onlyThisCentury = onlyMan.filter(
    man => Math.ceil(man.died / 100) === century || century === 0);

  const allAges = onlyThisCentury.map((years) => years.died - years.born);
  const collectAges = allAges.reduce((prevVal, nextVal) => prevVal + nextVal);

  return collectAges / allAges.length;
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
  const womans = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name))
    : people.filter(women => women.sex === 'f');

  const allAges = womans.map(years => years.died - years.born);
  const result = allAges.reduce((a, b) => a + b);

  return result / allAges.length;
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
  const childDiff = onlyWithSon
    ? people.filter(person => person.sex === 'm'
    && people.some(mom => mom.name === person.mother))
    : people.filter(person => people.some(mom => person.mother === mom.name));

  const diff = childDiff.reduce((prev, child) => {
    const mother = people.find(mom => mom.name === child.mother);

    const res = child.born - mother.born;

    return prev + res;
  }, 0);

  return diff / childDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

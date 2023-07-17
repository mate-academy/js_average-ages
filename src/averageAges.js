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
  const man = (!century)
    ? people
      .filter(person => person.sex === 'm')
    : people
      .filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);
  const menAverageAge = man
    .map(men => (men.died - men.born))
    .reduce((prev, age) => prev + age, 0) / man.length;

  return Math.round(menAverageAge * 100) / 100;
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
  const mothers = people.map(person => person.mother);
  const women = (!withChildren)
    ? people
      .filter(person => person.sex === 'f')
    : people
      .filter(person => person.sex === 'f'
      && person.name === mothers.find(mother => mother === person.name));

  const womenAverageAge = women
    .map(woman => woman.died - woman.born)
    .reduce((prev, age) => prev + age, 0) / women.length;

  return Math.round(womenAverageAge * 100) / 100;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  // const mothers = people.map(person => person.mother);

  const children = (!onlyWithSon)
    ? people
      .filter(person => people.some(p => p.name === person.mother))
    : people
      .filter(person => people.some(p => p.name === person.mother)
      && person.sex === 'm');

  const averageAgeDiff = children
    .reduce(function(prev, child) {
      const mother = people.find(person => person.name === child.mother);
      const different = child.born - mother.born;

      return prev + different;
    }, 0) / children.length;

  return Math.round(averageAgeDiff * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

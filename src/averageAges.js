'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 * learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  let menArr;

  century
    ? menArr = people.filter(
      (a) => Math.ceil(a['died'] / 100) === century && a['sex'] === 'm')
    : menArr = people.filter((a) => a['sex'] === 'm');

  return menArr.reduce((a, b) => a + (b.died - b.born), 0) / menArr.length;
}

/*
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  let womanArr;
  const motherArr = [];

  people.map((a) => motherArr.push(a['mother']));

  withChildren
    ? womanArr = people.filter((a) => motherArr.some((b) => b === a['name']))
    : womanArr = people.filter((a) => a['sex'] === 'f');

  return womanArr.reduce((a, b) => a + (b.died - b.born), 0) / womanArr.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const motherArr = [];

  function son(a) {
    return onlyWithSon
      ? people.some((c) => c['name'] === a['mother'] && a['sex'] === 'm')
      : people.some((c) => c['name'] === a['mother']);
  }

  people.map((a) =>
    son(a)
      ? motherArr.push(
        a['born'] - people.find((c) => c['name'] === a['mother'])['born'])
      : true);

  return motherArr.reduce((a, b) => a + b, 0) / motherArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

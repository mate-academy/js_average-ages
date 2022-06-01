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

  const men = people.filter((person) => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  const menAge = men.map((year) => year.died - year.born);

  const wholeMenAverageAge = menAge.reduce(
    (year1, year2) => year1 + year2 / menAge.length, 0);

  return wholeMenAverageAge;
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
  const wom = people.filter((person) => withChildren
    ? people.some(child => child.mother === person.name) && person.sex === 'f'
    : person.sex === 'f');

  const womAge = wom.map((year) =>
    year.died - year.born);

  const wholeWomAverageAge = womAge.reduce(
    (year1, year2) => year1 + year2 / womAge.length, 0);

  return wholeWomAverageAge;
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
  const kids = onlyWithSon
    ? people.filter(el => el.sex === 'm'
    && people.some(item => el.mother === item.name))
    : people.filter(el => people.some(item => el.mother === item.name));

  return kids.reduce((acc, el) => {
    const mother = people.find(item => el.mother === item.name);
    const diff = el.born - mother.born;

    return acc + diff;
  }, 0) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

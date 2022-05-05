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
  const arrayOnlyMen = people.filter(
    men => men.sex === 'm'
    && (Math.ceil(men.died / 100) === century || century === 0));

  const arrayWithYears = arrayOnlyMen.map(years => years.died - years.born);

  const result = arrayWithYears.reduce(
    (previousValue, currentValue) => previousValue + currentValue);

  return result / arrayWithYears.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  // write code here
  const arrayOnlyWomen = people.filter(
    woman => woman.sex === 'f' && (withChildren === false
      || people.some(child => child.mother === woman.name)));

  const arrayWithYears = arrayOnlyWomen.map(years => years.died - years.born);

  const result = arrayWithYears.reduce(
    (previousValue, currentValue) => previousValue + currentValue);

  return result / arrayWithYears.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  // write code here
  const arrayOnlyMom = people.filter(woman =>
    people.some(child => child.mother === woman.name));

  const arrayChildren = people.filter(child =>
    arrayOnlyMom.some(mom => mom.name === child.mother)
    && (onlyWithSon === false || child.sex === 'm'));

  const arrayWithYears = arrayChildren.map(child => {
    const mother = arrayOnlyMom.find(mom => child.mother === mom.name);

    return child.born - mother.born;
  });

  const result = arrayWithYears.reduce(
    (previousValue, currentValue) => previousValue + currentValue);

  return result / arrayWithYears.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

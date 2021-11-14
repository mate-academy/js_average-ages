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
  const centuryValue = (year) => Math.ceil(year / 100);
  const men = people.filter(item => item.sex === 'm');
  const menCentury = men.filter(item => centuryValue(item.died) === century);
  const averageAgeMen = men.reduce(
    (a, b) => a + (b.died - b.born), 0) / men.length;
  const averageAgeMenCentury = menCentury.reduce(
    (a, b) => a + (b.died - b.born), 0) / menCentury.length;
  const averageYear = century ? averageAgeMenCentury : averageAgeMen;

  return +averageYear.toFixed(2);
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = people.filter(item => item.sex === 'f');
  const womenMom = people.filter(item => item.sex === 'f'
    && people.some(person => person.mother === item.name)
  );
  const averageYearWomen = women.reduce(
    (a, b) => a + (b.died - b.born), 0
  ) / women.length;

  const averageYearWomenWidthChildren = womenMom.reduce(
    (a, b) => a + (b.died - b.born), 0
  ) / womenMom.length;

  const averageAge = withChildren
    ? averageYearWomenWidthChildren : averageYearWomen;

  return +averageAge.toFixed(2);
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
  const children = people.filter(child =>
    onlyWithSon
      ? people.find(mother => mother.name === child.mother && child.sex === 'm')
      : people.find(mother => mother.name === child.mother));

  const momYear = children.map(
    item => item.born - people.find(i => i.name === item.mother).born);

  const averageYears = momYear.reduce((a, b) => a + b) / momYear.length;

  return +averageYears.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

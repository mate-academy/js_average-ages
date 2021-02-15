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
  const men = people.filter(x => x.sex === 'm');
  const averagedAgeMen = men.reduce((a, b) =>
    a + (b.died - b.born) / men.length, 0);

  const centuryMen = men.filter(x => Math.ceil(x.died / 100) === century);
  const averageAgeMenCentury = centuryMen.reduce((a, b) =>
    a + (b.died - b.born) / centuryMen.length, 0);

  return century ? averageAgeMenCentury : averagedAgeMen;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const women = people.filter(x => x.sex === 'f');
  const averageAgeWomen = women.reduce((a, b) =>
    a + (b.died - b.born) / women.length, 0);

  const child = people.filter(x => people.some(y => y.name === x.mother));
  const withChild = people.filter(x => child.some(y => y.mother === x.name));
  const averageWithChildAge = withChild.reduce((a, b) =>
    a + (b.died - b.born) / withChild.length, 0);

  return withChildren ? averageWithChildAge : averageAgeWomen;
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
  const childs = people.filter(x => people.some(y => y.name === x.mother));
  const childsAges = childs.map(x =>
    x.born - people.find(y => y.name === x.mother).born);
  const childsAgesDifference = childsAges.reduce((a, b) =>
    a + b) / childs.length;

  const sons = people.filter(x =>
    people.some(y => y.name === x.mother) && x.sex === 'm');
  const sonsAges = sons.map(x =>
    x.born - people.find(y => y.name === x.mother).born);
  const sonsAgesDifference = sonsAges.reduce((a, b) => a + b) / sons.length;

  return onlyWithSon ? sonsAgesDifference : childsAgesDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

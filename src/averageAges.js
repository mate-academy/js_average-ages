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
function calculateMenAverageAge(people, centure) {
  let peopleFromTrueCenture;

  centure !== undefined
    ? peopleFromTrueCenture = people.filter((x) => (
      Math.ceil(x.died / 100) === centure
    ))
    : peopleFromTrueCenture = people;

  const mans = peopleFromTrueCenture.filter((x) => x.sex === 'm');

  const avarageMenAge = mans.reduce((total, x) => total
  + x.died - x.born, 0) / mans.length;

  return avarageMenAge;
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
  let onlyWomen;

  withChildren !== undefined
    ? onlyWomen = people.filter(y => people.some(x => x.mother
    === y.name))
    : onlyWomen = people.filter((x) => x.sex === 'f');

  const womenAverageAge = onlyWomen.reduce((total, x) => (
    total + x.died - x.born
  ), 0) / onlyWomen.length;

  return womenAverageAge;
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
  let Childs = [];

  const sonWithMother = people.filter(y => people.some(x => ((y.mother
    === x.name) && (y.sex === 'm'))));

  const childWithMother = people.filter(y => people.some(x => y.mother
    === x.name));

  onlyWithSon === undefined
    ? Childs = childWithMother
    : Childs = sonWithMother;

  const different = Childs.map(son => son.born
    - people.find(mother => mother.name === son.mother).born);

  const averageAgeDiff = different.reduce((x, total) => (
    x + total
  ), 0) / different.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

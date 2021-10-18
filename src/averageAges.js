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
/* eslint-disable */




function calculateMenAverageAge(people, century) {
  let males = people.filter(x => x.sex === 'm');;

  if (century === undefined) {
    let maleAges = [...males].map(x => x.died - x.born);

    return maleAges.reduce((sum, x) => sum + x) / males.length;
  }

  if (century) {
    let malesOfCentury = males.filter(x => Math.ceil(x.died / 100) === century);

    let maleAgesOfCentury = [...malesOfCentury].map(x => x.died - x.born);

    return maleAgesOfCentury.reduce((sum, x) => sum + x) / malesOfCentury.length;
  }
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
  let woman = people.filter(x => x.sex === 'f');

  if (withChildren === undefined) {
    let womanAges = [...woman].map(x => x.died - x.born);

    return womanAges.reduce((sum, x) => sum + x) / woman.length;
  }

  if (withChildren) {
    let womanWithChildren = woman
    .filter(x => people.find(person => person.mother === x.name));

    let womanWithChildrenAges = [...womanWithChildren].map(x => x.died - x.born);

    return womanWithChildrenAges.reduce((sum, x) => sum + x) / womanWithChildren.length;
  }
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
  let woman = people.filter(x => x.sex === 'f');

  let womanWithChildren = woman
  .filter(x => people.find(person => person.mother === x.name));

  let allChildren = people
  .filter(x => womanWithChildren.find(person => person.name === x.mother));

  if (onlyWithSon === undefined) {
    let birthGivingAge = allChildren
    .map(x => (x.born - people.find(person => person.name === x.mother).born));

    return birthGivingAge.reduce((sum, x) => sum + x) / allChildren.length;
  }

  if (onlyWithSon) {
    let onlySons = allChildren.filter(x => x.sex === 'm');

    let birthGivingAgeForSons = onlySons
      .map(x =>(x.born - people.find(person => person.name === x.mother).born));

    return birthGivingAgeForSons.reduce((sum, x) => sum + x) / onlySons.length;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

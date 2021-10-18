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
  let males = [];

  if (century === undefined) {
    males = people.filter(x => x.sex === 'm');

    let maleAges = [...males];

    maleAges = maleAges.map(x => x.died - x.born);

    let averageAge = 0;

    averageAge = maleAges.reduce((sum, x) => sum + x) / males.length;

    return averageAge;
  }

  if (century) {
    males = people.filter(x => x.sex === 'm' && Math.ceil(x.died / 100) === century);

    let maleAges18 = [...males];

    maleAges18 = maleAges18.map(x => x.died - x.born);

    const average = maleAges18.reduce((sum, x) => sum + x) / males.length;

    return average;
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
  let woman = [];

  woman = people.filter(x => x.sex === 'f');

  if (withChildren === undefined) {
    let womanAges = [...woman];

    womanAges = womanAges.map(x => x.died - x.born);

    let averageAge = 0;

    averageAge = womanAges.reduce((sum, x) => sum + x) / woman.length;

    return averageAge;
  }

  if (withChildren) {
    let womanWithChildren = [];

    womanWithChildren = woman.filter(x => people.find(person => {
      return person.mother === x.name;
    }));

    let womanWithChildrenAges = [...womanWithChildren];

    womanWithChildrenAges = womanWithChildren.map(x => x.died - x.born);

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
  let woman = [];

  woman = people.filter(x => x.sex === 'f');

  let womanWithChildren = [];

  womanWithChildren = woman.filter(x => people.find(person => person.mother === x.name));

  let allChildren = [];

  allChildren = people.filter(x => womanWithChildren.find(person => person.name === x.mother));

  if (onlyWithSon === undefined) {
    let birthGivingAge = [];

    birthGivingAge = allChildren.map(x => (x.born - people.find(person => person.name === x.mother).born));

    return birthGivingAge.reduce((sum, x) => sum + x) / allChildren.length;
  }

  if (onlyWithSon) {
    let onlySons = [];

    onlySons = allChildren.filter(x => x.sex === 'm');

    let birthGivingAgeForSons = [];

    birthGivingAgeForSons = onlySons.map(x => (x.born - people.find(person => person.name === x.mother).born));

    return birthGivingAgeForSons.reduce((sum, x) => sum + x) / onlySons.length;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

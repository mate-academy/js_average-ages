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
  let filteredMen = [];

  century === undefined
    ? filteredMen = people.filter(elem => elem.sex === 'm')
    : filteredMen = people
      .filter(elem => elem.sex === 'm'
        && century === Math.ceil(elem.died / 100));

  return (filteredMen.reduce((sum, elem) => sum + (elem.died - elem.born), 0))
    / filteredMen.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let filteredWomen = [];

  withChildren === true
    ? filteredWomen = people
      .filter(elem => elem.sex === 'f'
        && people.some(el => el.mother === elem.name))
    : filteredWomen = people.filter(elem => elem.sex === 'f');

  return (filteredWomen.reduce((sum, elem) => sum + (elem.died - elem.born), 0))
    / filteredWomen.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  let arrayOfAgeDifferences = [];

  const isMotherDefined = kid =>
    people.find(mother => mother.name === kid.mother) !== undefined;

  const isMotherWithSonDefined = kid => kid.sex === 'm'
    && people.find(mother => mother.name === kid.mother) !== undefined;

  const ageDifference = (kid) =>
    kid.born - people.find(mother => mother.name === kid.mother).born;

  onlyWithSon === undefined
    ? arrayOfAgeDifferences = people
      .filter(isMotherDefined)
      .map(ageDifference)
    : arrayOfAgeDifferences = people
      .filter(isMotherWithSonDefined)
      .map(ageDifference);

  return arrayOfAgeDifferences.reduce((sum, item) => sum + item, 0)
    / arrayOfAgeDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

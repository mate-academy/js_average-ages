/* eslint-disable indent */
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

function getAge(params) {
  return params.map(item => item.died - item.born);
}

function gateAverage(params) {
  return params.reduce((acc, item) => acc + item) / params.length;
}

function calculateMenAverageAge(people, century) {
  let men = people.filter(item => item.sex === 'm');

  if (century) {
    men = men.filter(item => Math.ceil(item.died / 100) === century);
  };

  return gateAverage(getAge(men));
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
  let women = people.filter(item => item.sex === 'f');

  if (withChildren) {
    women = women.filter(item =>
            people.some(elem => item.name === elem.mother));
  }

  return gateAverage(getAge(women));
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
  const mothers = people.filter(item => item.sex === 'f'
                  && people.some(elem => item.name === elem.mother));

  const children = people.filter(item => (onlyWithSon ? item.sex === 'm' : item)
                  && mothers.some(elem => item.mother === elem.name));

  return children.map(item =>
          mothers.map(elem => item.mother === elem.name
            ? item.born - elem.born
            : null)
          .filter(i => i !== null))
          .reduce((acc, item) => acc + item[0], 0) / children.length;
  };

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

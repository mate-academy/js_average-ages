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
function calculateMenAverageAge(people, century) {
  let men = people.filter(item => item.sex === 'm');

  if (century) {
    men = men.filter(item => Math.ceil(item.died / 100) === century);
  };

  return men.map(item => item.died - item.born)
            .reduce((acc, item) => acc + item) / men.length;
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

  return women.map(item => item.died - item.born)
              .reduce((acc, item) => acc + item) / women.length;
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
  const mothers = people.filter(item => item.sex === 'f')
                        .filter(item =>
                        people.some(elem => item.name === elem.mother));

  let children = people.filter(item =>
                 mothers.some(elem => item.mother === elem.name));

  if (onlyWithSon) {
    children = children.filter(item => item.sex === 'm');
  }

  return children.map(item =>
          mothers.map(elem => item.mother === elem.name
            ? item.born - elem.born
            : 0)
          .filter(i => i !== 0))
          .reduce((acc, item) => acc + item[0], 0) / children.length;
  };

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

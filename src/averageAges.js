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

function getPersonAge(params) {
  return params.map(item => item.died - item.born);
}

function getAverage(params) {
  return params.reduce((sum, item) => sum + item, 0) / params.length;
}

function calculateMenAverageAge(people, century) {
  let men = people.filter(item => item.sex === 'm');

  if (century) {
    men = men.filter(item => Math.ceil(item.died / 100) === century);
  }

  return getAverage(getPersonAge(men));
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

  return getAverage(getPersonAge(women));
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
  const mothers = people
    .filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name));

  const children = people
    .filter(child => (
      mothers.some(mother => mother.name === child.mother)
    ));

  let childrenWithMothers = children.map(child => {
    const motherOfChild = mothers
      .find(mother => mother.name === child.mother);

    return [child, motherOfChild];
  });

  onlyWithSon && (childrenWithMothers = childrenWithMothers
    .filter(pair => (pair[0].sex === 'm'))
  );

  return childrenWithMothers.reduce((sum, childWithMother) =>
    (sum + (childWithMother[0].born - childWithMother[1].born)), 0)
    / childrenWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

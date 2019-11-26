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
  let menAge, sumOfAllMenAge, menInNeedCenture;
  const men = people.filter(p => p.sex === 'm');

  if (century) {
    menInNeedCenture = men.filter(p => Math.ceil(p.died / 100) === century);
    menAge = menInNeedCenture.map(p => p.died - p.born);
    sumOfAllMenAge = menAge.reduce((res, el) => res + el, 0);

    return sumOfAllMenAge / menAge.length;
  } else {
    menAge = men.map(p => p.died - p.born);
    sumOfAllMenAge = menAge.reduce((res, el) => res + el, 0);

    return sumOfAllMenAge / menAge.length;
  }
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let womenAge, sumOfAllWomenAge, mothers;

  const women = people.filter(p => p.sex === 'f');

  if (withChildren) {
    mothers = women.filter(woman => people
      .some(person => person.mother === woman.name));
    womenAge = mothers.map(p => p.died - p.born);
    sumOfAllWomenAge = womenAge.reduce((res, el) => res + el, 0);

    return sumOfAllWomenAge / womenAge.length;
  } else {
    womenAge = women.map(p => p.died - p.born);
    sumOfAllWomenAge = womenAge.reduce((res, el) => res + el, 0);

    return sumOfAllWomenAge / womenAge.length;
  }
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
  const women = people.filter(p => p.sex === 'f');
  const mothers = women.filter(woman => people
    .some(person => person.mother === woman.name));
  const children = people.filter(child => (
    onlyWithSon ? child.sex === 'm' : child)
                && mothers.some(elem => child.mother === elem.name));

  return children.map(item =>
    mothers.map(elem => item.mother === elem.name
      ? item.born - elem.born
      : 0)
      .filter(i => i !== 0))
    .reduce((res, item) => res + item[0], 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

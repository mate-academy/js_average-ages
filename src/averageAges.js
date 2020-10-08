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
  return people.filter(person => person.sex === 'm'
  && (!century || century === Math.ceil(person.died / 100)))
    .map(men => men.died - men.born)
    .reduce((acc, cur, index, arr) => acc + cur / arr.length, 0);
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
  return people.filter(person =>
    person.sex === 'f'
    && (!withChildren
      || people.some(child => child.mother === person.name)))
    .map(women => women.died - women.born)
    .reduce((acc, cur, index, arr) => acc + cur / arr.length, 0);
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
  const children = people.filter(person =>
    (!onlyWithSon && person.mother)
    || (onlyWithSon
        && person.mother
        && person.sex === 'm')
  );

  const mothersAndChildren = children.map(child => {
    return {
      mom: people.find(mom => mom.name === child.mother),
      child: child,
    };
  }).filter(momAndChild => momAndChild.mom !== undefined);

  return mothersAndChildren.map(
    momAndChild => momAndChild.child.born - momAndChild.mom.born
  ).reduce((acc, cur, index, arr) => acc + cur / arr.length, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

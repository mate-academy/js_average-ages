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
  const menArray = century === undefined
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && century === Math.ceil(person.died / 100));

  return menArray
    .reduce((sum, man) => sum + (man.died - man.born), 0) / menArray.length;
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
  const womenArray = withChildren
    ? people.filter((person, index, arr) => person.sex === 'f'
        && arr.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return womenArray
    .reduce((sum, woman) => sum + (woman.died - woman.born), 0)
    / womenArray.length;
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
  const childrenMapping = new Map();
  const womenArray = people.filter(person => person.sex === 'f');
  onlyWithSon ? womenArray.forEach(woman => {
    people.filter(person => person.sex === 'm'
        && person.mother === woman.name)
      .forEach(man => childrenMapping.set(man, woman));
  })
    : womenArray.forEach(woman => {
      people.filter(person => person.mother === woman.name)
        .forEach(person => childrenMapping.set(person, woman));
    });

  return [...childrenMapping].reduce((sumDiff, [child, mother]) => {
    return sumDiff + (child.born - mother.born);
  }, 0) / childrenMapping.size;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

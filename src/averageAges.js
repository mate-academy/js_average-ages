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
  const menList = people.filter(man => {
    const isMan = man.sex === 'm';

    return !century
      ? isMan
      : isMan && Math.ceil(man.died / 100) === century;
  });

  return getAverageAge(menList);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenList = people.filter(woman => (
    !withChildren
      ? woman.sex === 'f'
      : people.some(child => child.mother === woman.name)
  ));

  return getAverageAge(womenList);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenList = people.filter(child => (
    !onlyWithSon
      ? people.find(mother => mother.name === child.mother)
      : people.find(mother => mother.name === child.mother) && child.sex === 'm'
  ));

  const ageDiffs = childrenList.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return getAverageAge(ageDiffs);
}

function getAverageAge(list) {
  const agesSum = list.reduce((total, item) => (
    (typeof item === 'object')
      ? total + (item.died - item.born)
      : total + item
  ), 0);

  return agesSum / list.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

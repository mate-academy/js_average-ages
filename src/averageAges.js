'use strict';

/**
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century.
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(man => {
    const isMan = man.sex === 'm';
    const isCenturySet = Math.ceil(man.died / 100) === century;

    return century
      ? isMan && isCenturySet
      : isMan;
  });

  return getAvarageAge(men);
}

/**
 * Function returns the average age of person.
 *
 * @param {object[]} people
 *
 * @return {number}
 */
function getAvarageAge(people) {
  return people.reduce((sum, person) => sum + (person.died - person.born), 0)
    / people.length;
}

/**
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(woman => {
    const isWoman = woman.sex === 'f';
    const hasChildren = people.some(children => children.mother === woman.name);

    return withChildren
      ? isWoman && hasChildren
      : isWoman;
  });

  return getAvarageAge(women);
}

/**
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
  const children = people.filter(child => {
    const hasMother = people.some(mother => mother.name === child.mother);
    const isMan = hasMother && child.sex === 'm';

    return onlyWithSon
      ? isMan
      : hasMother;
  });

  const diff = children.reduce((ageSum, child) => {
    const mother = people.find(parent => parent.name === child.mother);

    return ageSum + child.born - mother.born;
  }, 0);

  return diff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const male = people.filter((human) => (
    century
      ? human.sex === 'm' && Math.ceil(human.died / 100) === century
      : human.sex === 'm'
  ));

  const maleAge = male.reduce((acc, human) => {
    return (human.died - human.born) + acc;
  }, 0);

  return maleAge / male.length;
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
  const hasChild = (name) => people.some((human) => (
    human.mother === name
  ));

  const female = people.filter((human) => (
    withChildren
      ? human.sex === 'f' && hasChild(human.name)
      : human.sex === 'f'
  ));

  const femaleAge = female.reduce((acc, human) => {
    return (human.died - human.born) + acc;
  }, 0);

  return femaleAge / female.length;
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
  const hasParent = (parent) => people.some(human => (
    parent === human.name
  ));

  const getParentBorthDate = (parentName) => people.find(human => (
    parentName === human.name
  ))['born'];

  const children = people.filter((human) => (
    onlyWithSon
      ? human.sex === 'm' && hasParent(human.mother)
      : hasParent(human.mother)
  ));

  const egeDifference = children
    .reduce((acc, human) => (
      acc + human.born - getParentBorthDate(human.mother)
    ), 0);

  return egeDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

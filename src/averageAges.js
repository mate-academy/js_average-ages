'use strict';

function calculateAvrg(peoples) {
  return peoples.map(person =>
    person.died - person.born).reduce((x, y) => x + y) / peoples.length;
}

function sexFilter(peoples, sex) {
  return peoples.filter(person =>
    person.sex === sex);
}

function centuryFilter(peoples, century) {
  return peoples.filter(person =>
    Math.ceil(person.died / 100) === century);
}

function hasChild(peoples, parentType) {
  return peoples.filter(parent =>
    peoples.some(child =>
      child[parentType] === parent.name));
}

function hasParent(peoples, parents, parentType) {
  return peoples.filter(child =>
    parents.some(parent =>
      child[parentType] === parent.name));
}

function calculateDiff(peoples, theirChildrens, parentType) {
  const result = theirChildrens.map(child =>
    child.born - peoples.find(parent =>
      parent.name === child[parentType]).born).reduce((x, y) =>
    x + y) / theirChildrens.length;

  return result;
}

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
  const menOnly = sexFilter(people, 'm');
  const menCentury = centuryFilter(menOnly, century);

  return century
    ? calculateAvrg(menCentury)
    : calculateAvrg(menOnly);
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
  const womenOnly = sexFilter(people, 'f');
  const womenWithChild = hasChild(people, 'mother');

  return withChildren
    ? calculateAvrg(womenWithChild)
    : calculateAvrg(womenOnly);
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
  const parentType = 'mother';
  const parents = hasChild(people, parentType);
  const childrens = hasParent(people, parents, parentType);
  const childrenFilter = sexFilter(childrens, 'm');

  return onlyWithSon
    ? calculateDiff(parents, childrenFilter, parentType)
    : calculateDiff(parents, childrens, parentType);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men = people.filter(element => element.sex === 'm');

  const menAge = men.filter(element =>
    century
      ? Math.ceil(element.died / 100) === century
      : element);

  return getAverageAge(menAge);
}

function getAverageAge(array) {
  const ages = array.map(element => element.died - element.born);

  return ages.reduce((a, b) => a + b, 0) / ages.length;
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
  const women = people.filter(element => element.sex === 'f');

  const womenWithChildren = women.filter(element =>
    withChildren
      ? people.some(person => person.mother === element.name)
      : element);

  return getAverageAge(womenWithChildren);
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
  let children = people.filter(child =>
    people.some(person =>
      child.mother === person.name));

  if (onlyWithSon) {
    children = children.filter(person => person.sex === 'm');
  }

  function calcMotherChildDiff(obj) {
    const mother = people.find(person => person.name === obj.mother);

    return obj.born - mother.born;
  }

  const AgeDiff = children.map(calcMotherChildDiff);

  return AgeDiff.reduce((total, years) => total + years, 0) / AgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

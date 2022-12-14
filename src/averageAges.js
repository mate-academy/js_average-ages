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
function getAverageAge(array) {
  const ages = array.map(element => element.died - element.born);

  return ages.reduce((a, b) => a + b, 0) / ages.length;
}

function calculateMenAverageAge(people, century) {
  const manArray = century
    ? people.filter(person => (
      Math.ceil(person.died / 100) === century && person.sex === 'm'
    ))
    : people.filter(person => person.sex === 'm');

  return getAverageAge(manArray);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const mothers = people.map((x) => x.mother);

  const womanArr = withChildren ? people.filter(person => {
    return mothers.includes(person.name);
  }) : people.filter(person => person.sex === 'f');

  return getAverageAge(womanArr);
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
  // write code here
  const childrens = people.filter(
    person => people.find(mother => mother.name === person.mother));
  const children = onlyWithSon ? childrens.filter((child) => child.sex === 'm')
    : childrens;

  return children.reduce((sum, child) => {
    const mothers = people.find(mother => mother.name === child.mother);

    return sum + (child.born - mothers.born);
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

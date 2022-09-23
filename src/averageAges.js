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
  // write code here
  const men = people.filter(person => century
    ? (person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : person.sex === 'm');

  return getAverageAge(men);
}

function getAverageAge(peopleSort) {
  const averageAge = peopleSort.map(person => person.died - person.born)
    .reduce((sum, x) => sum + x, 0) / peopleSort.length;

  return averageAge;
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
  // write code here
  const women = people.filter(person => withChildren
    ? (person.sex === 'f'
      && isMother(people, person))
    : person.sex === 'f');

  return getAverageAge(women);
}

function isMother(people, person) {
  return people.find(child => child.mother === person.name);
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
  const children = people.filter(child =>
    onlyWithSon
      ? getChildren(people, child)
        && child.sex === 'm'
      : getChildren(people, child));

  return children.reduce((sum, child) =>
    sum + getDiffAge(children, people, child), 0) / children.length;
}

function getChildren(people, child) {
  return people.find(mother => mother.name === child.mother);
}

function getDiffAge(children, people, child) {
  const motherBirth = people.find(mother => mother.name === child.mother);

  return child.born - motherBirth.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

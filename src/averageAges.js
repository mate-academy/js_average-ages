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
function averageAge(people) {
  return people
    .reduce((x, y) => x + (y.died - y.born), 0)
    / people.length;
}

function calculateMenAverageAge(people, century) {
  const filterPeople = century
    ? people
      .filter(v => v.sex === 'm' && Math.ceil(v.died / 100) === century)
    : people
      .filter(v => v.sex === 'm');

  return averageAge(filterPeople);
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

function isChildren(people, parent, onlySon) {
  return onlySon
    ? people
      .some(v => v.sex === 'm' && v.mother === parent)
    : people
      .some(v => v.mother === parent);
}

function calculateWomenAverageAge(people, withChildren) {
  const filterPeople = withChildren
    ? people
      .filter(v => v.sex === 'f' && isChildren(people, v.name))
    : people
      .filter(v => v.sex === 'f');

  return averageAge(filterPeople);
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
  const isMother = (arr, name) => arr.some(v => v.name === name);

  const children = onlyWithSon
    ? people
      .filter(v => v.sex === 'm' && isMother(people, v.mother))
    : people
      .filter(v => isMother(people, v.mother));

  const mothers = onlyWithSon
    ? people
      .filter(v => isChildren(people, v.name, true))
    : people
      .filter(v => isChildren(people, v.name));

  return children
    .reduce((x, y) => x + (y.born - mothers
      .find(v => v.name === y.mother).born), 0)
        / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

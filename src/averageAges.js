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
    .reduce((prev, current) => prev + (current.died - current.born), 0)
      / people.length;
}

function calculateMenAverageAge(people, century) {
  const filterPeople = century
    ? people
      .filter(person => person.sex === 'm'
        && Math.ceil(person.died / 100) === century)
    : people
      .filter(person => person.sex === 'm');

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
      .some(child => child.sex === 'm' && child.mother === parent)
    : people
      .some(child => child.mother === parent);
}

function calculateWomenAverageAge(people, withChildren) {
  const filterPeople = withChildren
    ? people
      .filter(woman => woman.sex === 'f' && isChildren(people, woman.name))
    : people
      .filter(woman => woman.sex === 'f');

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
  const isMother = (arr, MotherName) => arr
    .some(mother => mother.name === MotherName);

  const children = onlyWithSon
    ? people
      .filter(child => child.sex === 'm' && isMother(people, child.mother))
    : people
      .filter(child => isMother(people, child.mother));

  const mothers = onlyWithSon
    ? people
      .filter(mother => isChildren(people, mother.name, true))
    : people
      .filter(mother => isChildren(people, mother.name));

  return children
    .reduce((prev, current) => prev + (current.born - mothers
      .find(mother => mother.name === current.mother).born), 0)
        / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men = getPersonBySex(people, 'm');

  const menWeNeed = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  return getAverageAge(menWeNeed);
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
  const women = getPersonBySex(people, 'f');

  const womenWeNeed = withChildren
    ? women
      .filter(woman => people
        .find(person => woman.name === person.mother))
    : women;

  return getAverageAge(womenWeNeed);
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
  const children = people
    .filter(child => people
      .find(person => person.name === child.mother));

  const childrenWeNeed = onlyWithSon
    ? getPersonBySex(children, 'm')
    : children;

  const averageAgeDiff = childrenWeNeed
    .reduce((sum, child) => sum + child.born - people
      .find(person => person.name === child.mother).born, 0)
    / childrenWeNeed.length;

  return averageAgeDiff;
}

function getAverageAge(people) {
  return people
    .reduce((sum, person) => (person.died - person.born) + sum, 0)
      / people.length;
}

function getPersonBySex(people, sex) {
  return people
    .filter((person) => person.sex === sex);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

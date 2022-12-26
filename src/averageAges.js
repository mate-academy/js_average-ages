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
function calculateMenAverageAge(people, century = null) {
  let men = people.filter(person => person.sex === 'm');

  men = century === null
    ? men
    : men.filter(man => Math.ceil(man.died / 100) === century);

  const ages = men.map(man => man.died - man.born);

  return ages.reduce((x, y) => x + y, 0) / ages.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  let women = people.filter(person => person.sex === 'f');

  women = withChildren === false
    ? women
    : women
      .filter(person => people
        .some(child => child.mother === person.name));

  const ages = women.map(person => person.died - person.born);

  return ages.reduce((x, y) => x + y, 0) / ages.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let children = people
    .filter(child => people
      .find(mother => child.mother === mother.name));

  children = onlyWithSon === false
    ? children
    : children.filter(child => child.sex === 'm');

  const ageDifferences = children
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born);

  return ageDifferences.reduce((x, y) => x + y, 0) / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men = people
    .filter(person => person.sex === 'm')
    .filter(man => century === undefined || century === getCentury(man));

  return getAverageValue(
    men.map(man => man.died - man.born),
  );
}

function getCentury(person) {
  return Math.ceil(person.died / 100);
}

function getAverageValue(values) {
  if (values.length === 0) {
    return 0;
  }

  const total = values.reduce(
    (sum, value) => sum + value,
    0,
  );

  return total / values.length;
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
  const women = people
    .filter(person => person.sex === 'f')
    .filter(woman => !withChildren || hasChildren(people, woman));

  return getAverageValue(
    women.map(woman => woman.died - woman.born),
  );
}

function hasChildren(people, mother) {
  return people.some(child => child.mother === mother.name);
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
  const childrenWithMothers = people
    .map(child => ({
      child,
      mother: getMother(people, child),
    }))
    .filter(({ mother }) => mother)
    .filter(({ child }) => !onlyWithSon || child.sex === 'm');

  return getAverageValue(
    childrenWithMothers.map(
      ({ mother, child }) => child.born - mother.born,
    ),
  );
}

function getMother(people, child) {
  return people.find(mother => child.mother === mother.name);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

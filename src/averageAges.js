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

function getAverageAge(ages) {
  const agesSum = ages.reduce((sum, age) => sum + age, 0);

  return agesSum / ages.length || 0;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => (
    person.sex === 'm'
    && (century
      ? Math.ceil(person.died / 100) === century
      : true
    )));

  const maleAges = men.map(man => man.died - man.born);

  return getAverageAge(maleAges);
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
  const women = people.filter(person => (
    person.sex === 'f'
    && (withChildren
      ? people.find(child => child.mother === person.name)
      : true
    )));

  const femaleAges = women.map(woman => woman.died - woman.born);

  return getAverageAge(femaleAges);
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
  const children = people.filter(person => (
    (onlyWithSon
      ? person.sex === 'm'
      : true
    )
    && people.find(mother => mother.name === person.mother)));

  const diffAges = children.map(child => {
    const childMother = people.find(person => person.name === child.mother);

    return child.born - childMother.born;
  });

  return getAverageAge(diffAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
function avarageCalculator(ages) {
  return ages.reduce((sum, age) => sum + age, 0) / ages.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(man => {
    const isMan = man.sex === 'm';

    return century
      ? isMan && Math.ceil(man.died / 100) === century
      : isMan;
  });
  const menAges = men.map(man => man.died - man.born);

  return avarageCalculator(menAges);
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
  const women = people.filter(woman => (
    withChildren
      ? people.find(child => child.mother === woman.name)
      : woman.sex === 'f'
  ));

  const womenAges = women.map(woman => woman.died - woman.born);

  return avarageCalculator(womenAges);
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
  const kids = people.filter(kid => {
    const isMother = mother => mother.name === kid.mother;

    return onlyWithSon
      ? people.find(isMother)
        && kid.sex === 'm'
      : people.find(isMother);
  });

  const agesDiff = kids.map(kid => (
    kid.born - people.find(mother => mother.name === kid.mother).born
  ));

  return avarageCalculator(agesDiff, kids.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

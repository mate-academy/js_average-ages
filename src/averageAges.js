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
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  // ---- find average age of men in century -----
  const findAgesInCentury = century && people
    .filter(man => century === Math.ceil(man.died / 100) && man.sex === 'm')
    .map(man => man.died - man.born);
  const averageAgeInCentury = century && findAgesInCentury
    .reduce((a, b) => a + b) / findAgesInCentury.length;

  // -------------- find average age of men -------------------
  const findAgesInWhole = people
    .filter(man => man.sex === 'm')
    .map(man => man.died - man.born);
  const averageAgeInWhole = findAgesInWhole
    .reduce((a, b) => a + b) / findAgesInWhole.length;

  const averageAge = averageAgeInCentury || averageAgeInWhole;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // ---- find average age of women with children -----
  const findAgesWithChildren = withChildren && people
    .filter(human =>
      (withChildren === !!people.find(person => person.mother === human.name))
      && (human.sex === 'f'))
    .map(human => human.died - human.born);
  const averageAgeWithChildren = withChildren && findAgesWithChildren
    .reduce((a, b) => a + b) / findAgesWithChildren.length;

  // ------------ find average age of women ----------------------
  const findWomenAges = people
    .filter(human => human.sex === 'f')
    .map(human => human.died - human.born);
  const averageWomenAge = findWomenAges
    .reduce((a, b) => a + b) / findWomenAges.length;

  const averageAge = averageAgeWithChildren || averageWomenAge;

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // ---- find age difference between a mother and her son -----
  const findOnlyWithSonDiff = onlyWithSon && people
    .filter(human => ((human.sex === 'm') === onlyWithSon)
      && people.find(mom => (human.mother === mom.name)))
    .map(child => child.born
      - people.find(mom => child.mother === mom.name).born);

  const averageDiffWithSon = onlyWithSon && findOnlyWithSonDiff
    .reduce((a, b) => a + b) / findOnlyWithSonDiff.length;

  // --- find average age difference between a mother and her child ---
  const findDiffOfAges = people
    .filter(human => people.find(mom => human.mother === mom.name))
    .map(child => child.born
      - people.find(mom => child.mother === mom.name).born);

  const averageChildToMotherAge = findDiffOfAges
    .reduce((a, b) => a + b) / findDiffOfAges.length;

  const averageAge = averageDiffWithSon || averageChildToMotherAge;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

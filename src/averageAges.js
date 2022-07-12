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
  let mens;

  century
    ? mens = people.filter(man => man.sex === 'm'
    && century === Math.ceil(man.died / 100))
    : mens = people.filter(man => man.sex === 'm');

  const sum = mens.reduce((init, man) => {
    return init + (man.died - man.born);
  }, 0);

  return (sum / mens.length);
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
  let women;

  withChildren
    ? women = people.filter((woman, i, arr) => (
      arr.find(person => person.mother === woman.name)))
    : women = people.filter(woman => woman.sex === 'f');

  const allWomenAges = women.reduce((init, woman) => {
    return init + (woman.died - woman.born);
  }, 0);

  return (allWomenAges / women.length);
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
  const ages = people.map((child, i, arr) => {
    let parent;

    onlyWithSon
      ? parent = arr.find(par => par.name === child.mother
      && (child.sex === 'm'))
      : parent = arr.find(par => (par.name === child.mother));

    const hasParent = parent
      ? (child.born - parent.born)
      : 0;

    return hasParent;
  });

  const mothersAges = ages.filter(age => age !== 0);

  const sumOfMomsAges = mothersAges.reduce((sum, num) => {
    return sum + num;
  }, 0);

  return (sumOfMomsAges / mothersAges.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

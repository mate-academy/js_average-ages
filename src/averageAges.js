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
  const mens = people.filter(man => {
    return century
      ? man.sex === 'm'
        && century === Math.ceil(man.died / 100)
      : man.sex === 'm';
  });

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
  const women = people.filter((woman, i, arr) => {
    return withChildren
      ? arr.find(person => person.mother === woman.name)
      : woman.sex === 'f';
  });

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
    const isParent = arr
      .find(par => {
        return onlyWithSon
          ? par.name === child.mother
            && (child.sex === 'm')
          : par.name === child.mother;
      });

    return isParent
      ? (child.born - isParent.born)
      : 0;
  })
    .filter(age => age !== 0);

  const sumOfMomsAges = ages
    .reduce((sum, num) => sum + num, 0);

  return (sumOfMomsAges / ages.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

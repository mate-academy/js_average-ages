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
  const mens = people.filter(men => {
    return century
      ? men.sex === 'm' && Math.ceil(men.died / 100) === century
      : men.sex === 'm';
  });

  const ages = mens.map(age => age.died - age.born);

  return getAverage(ages);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates ave`rage age only for women with children
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
  const womens = people.filter(women => women.sex === 'f');

  const womenAge = withChildren
    ? womens
      .filter(mom => people.some(child => child.mother === mom.name))
      .map(mom => mom.died - mom.born)
    : womens.map(mom => mom.died - mom.born);

  return getAverage(womenAge);
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
  return getAverage(
    people
      .filter(person => !onlyWithSon || person.sex === 'm')
      .map(child => [child, getMother(people, child)])
      .filter(([, mother]) => mother)
      .map(([child, mother]) => child.born - mother.born)
  );
};

function getMother(people, child) {
  return people.find(mother => mother.name === child.mother);
};

function getAverage(numbers) {
  const sum = numbers.reduce((a, b) => a + b);

  return sum / numbers.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

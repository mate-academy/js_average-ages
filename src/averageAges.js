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
  const mens = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const ageMens = mens.map(men => men.died - men.born);
  const sumMensAge = ageMens.reduce((x, y) => x + y);
  const averageMensAge = sumMensAge / mens.length;

  return averageMensAge;
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
  const womens = withChildren
    ? people.filter(mother => mother.sex === 'f'
      && people.some(mumName => mumName.mother === mother.name))
    : people.filter(mother => mother.sex === 'f');

  const ageWomens = womens.map(women => women.died - women.born);
  const sumWomenAge = ageWomens.reduce((x, y) => x + y);
  const averageWomenAge = sumWomenAge / womens.length;

  return averageWomenAge;
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
  const childrens = people.filter(person => onlyWithSon
    ? people.some(mother => mother.name === person.mother
      && person.sex === 'm')
    : people.some(mother => mother.name === person.mother));

  const differences = childrens.map(
    child => child.born - people.find(mum => child.mother === mum.name).born
  );

  const sumDiffAge = differences.reduce((a, b) => a + b);
  const averegeDiffAge = sumDiffAge / childrens.length;

  return averegeDiffAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men = people.filter(person =>
    person.sex === 'm'
    && (!century || century === Math.ceil(person.died / 100)));
  const agesOfLife = men.map(man => man.died - man.born);
  const averageAge = agesOfLife.reduce((sum, age) => sum + age, 0);
  const length = agesOfLife.length;

  return averageAge / length;
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
  const womans = people.filter(person =>
    person.sex === 'f'
    && (!withChildren || people.some(woman => woman.mother === person.name)));
  const agesOfLife = womans.map(woman => woman.died - woman.born);
  const averageAge = agesOfLife.reduce((sum, age) => sum + age, 0);
  const length = agesOfLife.length;

  return averageAge / length;
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
  const childrens = people.filter(person =>
    onlyWithSon
      ? people.find(mother => mother.name === person.mother
      && person.sex === 'm')
      : people.find(mother => mother.name === person.mother));
  const ages = childrens.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);
  const averageAge = ages.reduce((sum, age) => sum + age, 0);
  const length = ages.length;

  return averageAge / length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

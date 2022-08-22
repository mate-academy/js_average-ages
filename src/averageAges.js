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
  const men = people.filter(person => person.sex === 'm');
  const lifeYears = (!century)
    ? men.map(man => man.died - man.born)
    : men.filter(man => Math.ceil(man.died / 100) === century)
      .map(man => man.died - man.born);

  return lifeYears.reduce((sum, age) => sum + age, 0) / lifeYears.length;
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
  const women = people.filter(person => person.sex === 'f');
  const nameOfMothers = people.map(person => person.mother);
  const arrOfMothers = women.filter(woman =>
    nameOfMothers.includes(woman.name)
  );

  const hasChild = (!withChildren)
    ? women.map(woman => woman.died - woman.born)
    : arrOfMothers.map(woman => woman.died - woman.born);

  return hasChild.reduce((sum, age) => sum + age, 0) / hasChild.length;
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
  const childOfMother = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.some(mother => mother.name === person.mother)
    : people.some(mother => mother.name === person.mother)
  );

  const diffAges = childOfMother.map(child => child.born
    - people.find(mother => mother.name === child.mother).born);

  return diffAges.reduce((sum, age) => sum + age) / diffAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

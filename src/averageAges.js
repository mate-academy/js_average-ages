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
  const men = century ? people.filter(person =>
    (Math.ceil(person.died / 100) === century) && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const averageAge = men.reduce((acum, man) =>
    acum + (man.died - man.born), 0) / men.length;

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
  const women = withChildren ? people.filter(person =>
    (people.some(woman => woman.mother === person.name) && person.sex === 'f'))
    : people.filter(person => person.sex === 'f');
  const averageAge = women.reduce((acum, woman) =>
    acum + (woman.died - woman.born), 0) / women.length;

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
  const mothers = people.filter(person => person.sex === 'f'
  && people.some(women => women.mother === person.name));

  const children = onlyWithSon ? people.filter(person =>
    mothers.some(mother => mother.name === person.mother)
    && person.sex === 'm')
    : people.filter(person => mothers.some(mother =>
      mother.name === person.mother));

  const ageDifference = children.reduce((a, child) =>
    a + (child.born - (mothers.find(mother =>
      mother.name === child.mother)).born), 0) / children.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

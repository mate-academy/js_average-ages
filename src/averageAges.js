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
  const men = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const totalAge = men
    .map(man => man.died - man.born)
    .reduce((sum, age) => sum + age);

  return totalAge / men.length;
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
  const women = withChildren
    ? people.filter(p => p.sex === 'f'
      && people.some(person => person.mother === p.name))
    : people.filter(person => person.sex === 'f');

  const totalAge = women
    .map(woman => woman.died - woman.born)
    .reduce((sum, age) => sum + age);

  return totalAge / women.length;
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
  const boys = people.filter(son =>
    onlyWithSon
      ? son.sex === 'm' && people.some(person => person.name === son.mother)
      : people.some(person => person.name === son.mother)
  );

  const difference = boys.map(person => person.born - people.find(
    boy => person.mother === boy.name).born);

  const totalDifference = difference.reduce((sum, person) => sum + person, 0);

  return totalDifference / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

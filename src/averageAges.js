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
  const filteredMen = century
    ? people.filter(person => (person.sex === 'm')
      && (Math.ceil(person.died / 100) === century))
    : people.filter(person => person.sex === 'm');

  const sumOfAges = filteredMen.reduce((acc, man) =>
    acc + (man.died - man.born), 0);

  return sumOfAges / filteredMen.length;
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
  const filteredWoman = withChildren
    ? people.filter(person => people.some(child =>
      child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const sumOfAges = filteredWoman.reduce((acc, woman) =>
    acc + (woman.died - woman.born), 0);

  return sumOfAges / filteredWoman.length;
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
  const filteredChildren = onlyWithSon
    ? people.filter(child => people.some(mother =>
      mother.name === child.mother && child.sex === 'm'))
    : people.filter(child => people.some(mother =>
      mother.name === child.mother));

  const ageDifferences = filteredChildren.map(child =>
    child.born - (people.find(person => child.mother === person.name)).born);

  const sumOfAges = ageDifferences.reduce((acc, age) =>
    acc + age, 0);

  return sumOfAges / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const rightMen = people.filter(person =>
    century !== undefined
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  return rightMen.reduce((start, p) =>
    start + (p.died - p.born), 0) / rightMen.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const rightWomen = people.filter(person =>
    withChildren !== undefined
      ? people.some(x => x.mother === person.name) && person.sex === 'f'
      : person.sex === 'f');

  return rightWomen.reduce((start, p) =>
    start + (p.died - p.born), 0) / rightWomen.length;
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
  const rightMothers = people.filter(person =>
    onlyWithSon
      ? person.sex === 'm' && people.some(mother =>
        person.mother === mother.name)
      : people.some(mother => person.mother === mother.name));

  const bornDif = rightMothers.map(person =>
    person.born - people.find(mother => person.mother === mother.name).born);

  const averageBornDif = bornDif.reduce((prev, element) =>
    element + prev) / bornDif.length;

  return averageBornDif;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

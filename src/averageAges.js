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
  const onlyMen = people.filter(century
    ? person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century
    : person => person.sex === 'm');

  const averageMenAge = onlyMen.reduce(
    (acc, men) => acc + (men.died - men.born), 0
  ) / onlyMen.length;

  return averageMenAge;
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
  const onlyWomen = people.filter(withChildren
    ? person => people.find(child => child.mother === person.name)
    : person => person.sex === 'f');

  const averageWomenAge = onlyWomen.reduce((acc, women) =>
    acc + (women.died - women.born), 0) / onlyWomen.length;

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
  const mother = people.filter(onlyWithSon
    ? children => people.some(person =>
      person.name === children.mother) && children.sex === 'm'
    : children => people.find(person =>
      (person.name === children.mother)));

  const motherAge = mother.map(women =>
    (women.born - people.find(person =>
      person.name === women.mother).born));

  const age = motherAge.reduce((acc, element) =>
    acc + element) / motherAge.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

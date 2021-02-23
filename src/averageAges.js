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
  const wasManBornInCentury = (person) =>
    person.sex === 'm' && Math.ceil(person.died / 100) === century;

  const isMan = (person) => person.sex === 'm';

  const filteredMen = people.filter(
    century
      ? wasManBornInCentury
      : isMan
  );

  return filteredMen
    .map(men => men.died - men.born)
    .reduce((previousMan, nextMan) =>
      previousMan + nextMan) / filteredMen.length;
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
  const isWomanWithChildren = (person) => {
    return people.some(
      human => human.mother === person.name && person.sex === 'f'
    );
  };

  const isWoman = (person) => person.sex === 'f';

  const women = people.filter(
    withChildren
      ? isWomanWithChildren
      : isWoman
  );

  return women
    .map(person => person.died - person.born)
    .reduce((previousWoman, nextWoman) =>
      previousWoman + nextWoman) / women.length;
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
  const isWomanOnlyWithSon = (person) => {
    return people.some(
      woman => person.mother === woman.name
    ) && person.sex === 'm';
  };

  const isWomanWithChild = (person) => {
    return people.some(woman => person.mother === woman.name);
  };

  const children = people.filter(
    onlyWithSon
      ? isWomanOnlyWithSon
      : isWomanWithChild
  );

  return children
    .map(person =>
      person.born - people.find(woman => woman.name === person.mother).born)
    .reduce((previousChild, nextChild) =>
      previousChild + nextChild) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

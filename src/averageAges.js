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
  const callBack = century
    ? person => person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person => person.sex === 'm';
  const onlyMan = people.filter(callBack);

  const totalAge = onlyMan
    .reduce(function(accumulator, person) {
      return accumulator + person.died - person.born;
    }, 0);

  return Number(totalAge / onlyMan.length);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const callBack = withChildren
    ? (person, idex, array) => person.sex === 'f'
    && array.find(child => child.mother === person.name)
    : (person) => person.sex === 'f';
  const onlyWoman = people.filter(callBack);

  const totalAge = onlyWoman
    .reduce(function(accumulator, person) {
      return accumulator + person.died - person.born;
    }, 0);

  return Number(totalAge / onlyWoman.length);
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
  const children = people.filter(function(person, index, array) {
    return onlyWithSon
      ? array.find(mother => mother.name === person.mother)
        && person.sex === 'm'
      : array.find(mother => mother.name === person.mother);
  });

  const ageDifference = children.map(person =>
    person.born - (people.find(mother => mother.name === person.mother).born));

  return ageDifference.reduce((accumulator, person) =>
    accumulator + person) / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

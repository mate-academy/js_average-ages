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
  const persons = people.filter(person => person.sex === 'm');

  const midAgeAll = persons.reduce((sum, man) =>
    (sum + man.died - man.born), 0) / persons.length;

  const manInCentry = persons.filter(man =>
    Math.ceil(man.died / 100) === century);
  const midAgeCentry = manInCentry.reduce((sum, man) =>
    (sum + man.died - man.born), 0) / manInCentry.length;

  return century ? midAgeCentry : midAgeAll;
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
  const womens = people.filter(person => person.sex === 'f');
  const womensWithChild = people.filter(women =>
    women.sex === 'f' && people.some(child =>
      child.mother === women.name));

  const arrForCalc = withChildren
    ? womensWithChild : womens;

  const midAge = arrForCalc.reduce((accum, date) =>
    (accum + (date.died - date.born)), 0) / arrForCalc.length;

  return midAge;
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
  const childrens = onlyWithSon
    ? people.filter(person => person.sex === 'm')
      .filter(boy => people.some(parent => parent.name === boy.mother))
    : people.filter(person => people.some(parent => parent.name
      === person.mother));

  const peopleAgeDiff = childrens.map(child => child.born - people
    .find(mother => child.mother === mother.name).born);

  const midAge = peopleAgeDiff.reduce((acc, age) =>
    acc + age, 0) / peopleAgeDiff.length;

  return midAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

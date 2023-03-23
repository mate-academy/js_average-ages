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
  const males = people.filter(person => person.sex === 'm');
  const filredMales = century
    ? males.filter(male => Math.ceil(male.died / 100) === century)
    : males;
  const ageSum = filredMales.reduce((accum, man) =>
    accum + (man.died - man.born), 0);

  return ageSum / filredMales.length;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const woman = people.filter(person => person.sex === 'f');
  const filteredWoman = withChildren
    ? woman.filter(person =>
      people.some(child => child.mother === person.name))
    : woman;
  const ageSum = filteredWoman.reduce((accum, person) =>
    accum + (person.died - person.born), 0);

  return ageSum / filteredWoman.length;
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
  const kids = people.filter(kid =>
    kid.mother && people.some(parent => parent.name === kid.mother));
  const filteredKids = onlyWithSon
    ? kids.filter(kid => kid.sex === 'm')
    : kids;
  const ageDiffs = filteredKids.map(person =>
    person.born - people.find(mom => mom.name === person.mother).born);
  const ageDiffTotal = ageDiffs.reduce((accum, ageDiff) => accum + ageDiff, 0);

  return ageDiffTotal / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

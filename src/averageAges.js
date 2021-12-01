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
  const men = people.filter(person =>
    century
      ? person.sex === 'm' && century === Math.ceil(person.died / 100)
      : person.sex === 'm'
  );

  const allMenYears = men.reduce((accum, person) =>
    accum + (person.died - person.born), 0);

  return allMenYears / men.length;
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
function checkMother(people, mother) {
  return people.some(person => person.mother === mother.name);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    withChildren
      ? person.sex === 'f' && checkMother(people, person)
      : person.sex === 'f'
  );

  const allWomenYears = women.reduce((accum, person) =>
    accum + (person.died - person.born), 0);

  return allWomenYears / women.length;
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

function asMother(people, child) {
  return people.some(person => person.name === child.mother);
}

function motherBorn(people, mother) {
  return people.find(person => person.name === mother).born;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const kids = people.filter(person =>
    onlyWithSon
      ? person.sex === 'm' && asMother(people, person)
      : asMother(people, person)
  );

  const differYears = kids.map(kid =>
    kid.born - motherBorn(people, kid.mother)
  );

  const averageYear = differYears.reduce((accum, year) => accum + year);

  return averageYear / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

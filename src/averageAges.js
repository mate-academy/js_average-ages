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
  const male = people.filter(
    century
      ? person => Math.ceil(person.died / 100) === century
      && person.sex === 'm'
      : person => person.sex === 'm'
  );

  return male.reduce((acc, man) => acc + (man.died - man.born), 0)
  / male.length;
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
  const female = people.filter(
    withChildren
      ? person => person.sex === 'f'
      && people.some(kid => kid.mother === person.name)
      : person => person.sex === 'f'
  );

  return female.reduce(
    (acc, woman) => acc + (woman.died - woman.born),
    0) / female.length;
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
  const kids = people.filter(
    !onlyWithSon
      ? person => people.find(kid => kid.name === person.mother)
      : person => people.find(kid => kid.name === person.mother)
      && person.sex === 'm'
  );

  const differencies = kids.map(kid => kid.born - people
    .find(women => women.name === kid.mother).born);

  return differencies.reduce(
    (acc, difference) => acc + difference
    , 0) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

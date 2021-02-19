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
  const mens = people.filter(
    century
      ? men => men.sex === 'm' && Math.ceil(men.died / 100) === century
      : men => men.sex === 'm'
  );

  return mens.map(
    men => men.died - men.born
  ).reduce(
    (sum, person) => sum + person
  ) / mens.length;
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
  const women = people.filter(
    person => withChildren
      ? people.some(child => child.mother === person.name && person.sex === 'f')
      : person.sex === 'f'
  );

  return women
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / women.length;
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
  // write code here
  const child = people.filter(
    person => people.some(women => women.name === person.mother)
  );
  const childAges = child.map(
    person => person.born - people.find(
      women => women.name === person.mother
    ).born
  );
  const diff = childAges.reduce((acc, cur) => acc + cur) / child.length;

  const sons = people.filter(
    person => people.some(
      son => person.mother === son.name
    ) && person.sex === 'm'
  );
  const sonsAges = sons.map(
    person => person.born - people.find(
      son => son.name === person.mother
    ).born
  );
  const sonsAgesDiff = sonsAges.reduce(
    (acc, cur) => acc + cur
  ) / sons.length;

  return onlyWithSon ? sonsAgesDiff : diff;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

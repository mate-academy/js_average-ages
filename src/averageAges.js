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
  const men = people
    .filter(man => man.sex === 'm');
  const menOfCentury = men.filter(year =>
    Math.ceil(year.died / 100) === century);

  return century
    ? menOfCentury.reduce((sumAges, age) =>
      sumAges + (age.died - age.born) / menOfCentury.length, 0)
    : men.reduce((sumAges, age) =>
      sumAges + (age.died - age.born) / men.length, 0);
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
  const women = people.filter(person => person.sex === 'f');

  const mothers = people
    .filter(person => people.find(mother => mother.mother === person.name));

  return withChildren
    ? mothers.reduce((sumAges, age) =>
      sumAges + age.died - age.born, 0) / mothers.length
    : women.reduce((sumAges, age) =>
      sumAges + age.died - age.born, 0) / women.length;
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
  const mothers = new Set(people
    .filter(mother => people.find(person => person.mother === mother.name))
    .map(mother => mother.name));

  const kids = people.filter(kid => mothers.has(kid.mother));

  const children = onlyWithSon
    ? kids.filter(sons => sons.sex === 'm')
    : kids;

  return children.map(child => child.born - people
    .find(mother => child.mother === mother.name).born)
    .reduce((ages, age) => ages + age) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

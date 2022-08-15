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
  const men = century
    ? people.filter(person => (
      person.sex === 'm' && Math.ceil(person.died / 100) === century))
    : people.filter(person => person.sex === 'm');

  return getSum(men);
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
  const women = withChildren
    ? people.filter(person => (
      person.sex === 'f' && people.some(kid => kid.mother === person.name)))
    : people.filter(person => person.sex === 'f');

  return getSum(women);
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
  const kids = onlyWithSon
    ? people.filter(kid => (
      people.find(mother => (
        kid.mother === mother.name)) && kid.sex === 'm'))
    : people.filter(kid => (
      people.find(mother => (
        kid.mother === mother.name))));

  return kids.reduce((total, kid) => {
    return total + kid.born - people.find(mother => (
      kid.mother === mother.name)).born;
  }, 0) / kids.length;
}

function getSum(sex) {
  return sex.reduce((sum, p) => sum + (p.died - p.born), 0) / sex.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

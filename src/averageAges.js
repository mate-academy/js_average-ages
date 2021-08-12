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
      person.sex === 'm' && Math.ceil(person.died / 100) === century
    ))
    : people.filter(person => person.sex === 'm');

  return men.reduce((sumOfAges, man) => (
    sumOfAges + (man.died - man.born)
  ),
  0,
  ) / men.length;
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
  const women = withChildren
    ? people.filter(womanWithChildren => (
      people.some(person => (
        person.mother === womanWithChildren.name
      ))))
    : people.filter(person => person.sex === 'f');

  return women.reduce((sumOfAges, woman) => (
    sumOfAges + (woman.died - woman.born)
  ),
  0,
  ) / women.length;
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
  const kids = onlyWithSon
    ? people.filter((kid) => (
      kid.sex === 'm' && people.some(person => (
        kid.mother === person.name
      ))))
    : people.filter((kid) => (
      people.some(person => (
        kid.mother === person.name
      ))));

  const ageDiff = kids.map(kid => (
    kid.born - people.find(person => (
      person.name === kid.mother
    ))
      .born
  ));

  return (ageDiff.reduce((sum, age) => sum + age, 0)) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const mens = people.filter((person) => person.sex === 'm');
  const mensInCentury = (century)
    ? mens.filter((person) => Math.ceil(person.died / 100) === century)
    : mens;

  const mensAges = mensInCentury.map((man) => man.died - man.born);

  return mensAges.reduce((acc, age) => acc + age, 0) / mensAges.length;
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
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = (withChildren)
    ? women.filter(person => people.some(child => child.mother === person.name))
    : women;

  const womenAges = womenWithChildren.map(woman => woman.died - woman.born);

  return womenAges.reduce((acc, age) => acc + age, 0) / womenAges.length;
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
  const children = people.filter(child => child.mother !== null
    && people.find(woman => woman.name === child.mother));
  const boys = (onlyWithSon)
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDifference = boys.map(child => {
    const mom = people.find(woman => woman.name === child.mother);

    return child.born - mom.born;
  });

  return ageDifference.reduce(
    (acc, age) => acc + age, 0) / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

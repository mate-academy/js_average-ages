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
  const mens = (century === undefined)
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  const mensAges = mens.map(person => person.died - person.born);
  const menAverageAge = mensAges.reduce((accum, age) => accum + age)
   / mensAges.length;

  return menAverageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a women has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map(person => person.mother);
  const womens = (withChildren === undefined)
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => mothers.includes(person.name));
  const womensAges = womens.map(person => person.died - person.born);
  const womenAverageAge = womensAges.reduce((accum, age) => accum + age)
   / womensAges.length;

  return womenAverageAge;
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
  const children = (onlyWithSon === undefined)
    ? people.filter(person => people.some(parent =>
      person.mother === parent.name))
    : people.filter(person => people.some(parent =>
      person.mother === parent.name && person.sex === 'm'));

  const mothers = children.map(child => people.find(mother =>
    mother.name === child.mother));
  const differenceAges = children.map((child, index) =>
    child.born - mothers[index].born);
  const averageAge = differenceAges.reduce((accum, age) => accum + age)
    / differenceAges.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

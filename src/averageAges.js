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
  const men = (century === undefined)
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);

  const menAges = men.map(person => person.died - person.born);

  const menAverageAge = menAges.reduce((arg, age) => arg + age)
    / menAges.length;

  return menAverageAge;
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
  const mom = people.map(person => person.mother);

  const women = (withChildren === undefined)
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => mom.includes(person.name));

  const womenAges = women.map(person => person.died - person.born);

  const womenAverage = womenAges.reduce((arg, age) => arg + age)
   / womenAges.length;

  return womenAverage;
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
  const kids = (onlyWithSon === undefined)
    ? people.filter(person => people.some(parent =>
      person.mother === parent.name))
    : people.filter(person => people.some(parent =>
      person.mother === parent.name && person.sex === 'm'));

  const mom = kids.map(child => people.find(mother =>
    mother.name === child.mother));

  const difference = kids.map((child, index) =>
    child.born - mom[index].born);

  const averageAge = difference.reduce((arg, age) => arg + age)
    / difference.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const men = people.filter(person => {
    return century ? person.sex === 'm'
      && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  const menAge = men.map(person => person.died - person.born);
  const menTotalAge = menAge.reduce((sum, age) => sum + age);
  const menAverageAge = menTotalAge / men.length;

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
  const mother = people.map(person => person.mother);

  const women = people.filter(person => {
    return (withChildren) ? mother.includes(person.name)
      : person.sex === 'f';
  });

  const womenAges = women.map(person => person.died - person.born);
  const womenTotalAge = womenAges.reduce((sum, age) => sum + age);
  const womenAverageAge = womenTotalAge / women.length;

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
  let children = [...people].filter(person => onlyWithSon
    ? person.mother !== null && person.sex === 'm'
    : person.mother !== null);

  children = children.filter(child => (
    people.some(woman => woman.name === child.mother)
  ));

  children = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return children.reduce((a, b) => a + b) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

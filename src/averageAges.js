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
  const men = people.filter((person) => {
    person.century = Math.ceil(person.died / 100);
    person.age = person.died - person.born;

    return century === undefined
      ? person.sex === 'm'
      : person.sex === 'm' && person.century === century;
  }).map(person => person.age);

  return men.reduce((prevAge, currentAge) => prevAge + currentAge) / men.length;
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
  const women = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => person.sex === 'f'
  && people.find(child => person.name === child.mother));

  return women.map(person => {
    person.age = person.died - person.born;

    return person.age;
  })
    .reduce((prevAge, currentAge) => prevAge + currentAge) / women.length;
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
  const children = !onlyWithSon
    ? people.filter(child => child.mother)
    : people.filter(child => child.mother && child.sex === 'm');

  let childrenQuantity = children.length;

  const agesSum = children.reduce((sum, child) => {
    const mother = people.find(mama => child.mother === mama.name);

    if (!mother) {
      childrenQuantity--;

      return sum;
    }

    return sum + (child.born - mother.born);
  }, 0);

  return agesSum / childrenQuantity;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

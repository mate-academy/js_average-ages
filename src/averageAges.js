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
  let filtered = people.filter(person => person.sex === 'm');

  if (century) {
    filtered = filtered.filter(person =>
      Math.ceil(person.died / 100) === century);
  }

  return getAverageAge(filtered);
};

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let filtered = people.filter(person => person.sex === 'f');

  if (withChildren) {
    filtered = filtered.filter(mother =>
      people.find(child => mother.name === child.mother));
  }

  return getAverageAge(filtered);
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
  let children = people.filter(child => child.mother);

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  let quantity = children.length;

  const amount = children.reduce((previous, child) => {
    const mother = people.find(mom => child.mother === mom.name);

    if (!mother) {
      quantity--;

      return previous;
    }

    const sum = previous + (child.born - mother.born);

    return sum;
  }, 0);

  return amount / quantity;
}

function getAverageAge(people) {
  return people.reduce((previous, person) => {
    const sum = previous + (person.died - person.born);

    return sum;
  }, 0) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

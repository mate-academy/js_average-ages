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

function countAvaregeAge(people) {
  return people.reduce((acc, currentPerson) => {
    const currentPersonAge = currentPerson.died - currentPerson.born;

    return acc + currentPersonAge / people.length;
  }, 0);
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  if (century) {
    const diedInCentury = men.filter(person =>
      Math.ceil(person.died / 100) === century);

    return countAvaregeAge(diedInCentury);
  } else {
    return countAvaregeAge(men);
  }
}

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
  const women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    const womenWithChildren = people.filter(woman => {
      return people.some(child => child.mother === woman.name);
    });

    return countAvaregeAge(womenWithChildren);
  } else {
    return countAvaregeAge(women);
  }
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
  const women = people
    .filter(person => person.sex === 'f')
    .filter(woman => people.some(child => child.mother === woman.name));

  const ageDiff = [];

  if (onlyWithSon) {
    women.map(woman => people.map(child => {
      if (child.sex === 'm' && child.mother === woman.name) {
        ageDiff.push(child.born - woman.born);
      }
    }));
  } else {
    women.map(woman => people.map(child => {
      if (child.mother === woman.name) {
        ageDiff.push(child.born - woman.born);
      }
    }));
  }

  return ageDiff.reduce((acc, age) => acc + age) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

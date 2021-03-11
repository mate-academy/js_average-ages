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
  const man = people.filter(value => {
    if (century) {
      return value.sex === 'm' && (Math.ceil(value.died / 100) === century);
    } else {
      return value.sex === 'm';
    }
  });

  const agesMans = man.map(value => value.died - value.born);

  const totalAges = agesMans.reduce((total, age) => total + age, 0);

  return totalAges / man.length;
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
  const mom = people.map(person => person.mother).filter(val => val !== null);

  const women = people.filter(value => {
    if (withChildren) {
      return value.sex === 'f' && (mom.includes(value.name));
    } else {
      return value.sex === 'f';
    }
  }
  );

  const agesWomen = women.map(value => value.died - value.born);

  const totalAges = agesWomen.reduce((total, age) => total + age, 0);

  return totalAges / women.length;
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
  const children = people.filter(value => {
    if (onlyWithSon) {
      return people.some(mom => mom.name === value.mother)
      && (value.sex === 'm');
    } else {
      return people.some(mom => mom.name === value.mother);
    }
  });

  const age = children.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  const totalSum = age.reduce((total, year) => year + total, 0);

  return totalSum / age.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

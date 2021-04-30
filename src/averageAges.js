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
  let mens = people.filter(person => person.sex === 'm');

  if (century) {
    mens = mens.filter(men => Math.ceil(men.died / 100) === century);
  }

  const mensYearsOfLife = mens.map(men => men.died - men.born);

  const sum = mensYearsOfLife.reduce((accumulator, current) => {
    return accumulator + current;
  });

  return sum / mensYearsOfLife.length;
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
  let womens = people.filter(person => person.sex === 'f');

  if (withChildren) {
    womens = womens.filter(women => {
      return people.some(person => person.mother === women.name);
    });
  }

  const womensYearsOfLife = womens.map(women => women.died - women.born);

  const sum = womensYearsOfLife.reduce((accumulator, current) => {
    return accumulator + current;
  });

  return sum / womensYearsOfLife.length;
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
  const children = people.filter(child => {
    return onlyWithSon
      ? people.some(mother => {
        return (mother.name === child.mother) && child.sex === 'm';
      })
      : people.some(mother => mother.name === child.mother);
  });

  const childrenBirth = children.map(child => child.born);

  const mothers = children.map(child => {
    return people.find(mother => mother.name === child.mother);
  });

  const mothersBirth = mothers.map(mother => mother.born);

  const reducer = (sum, current) => sum + current;

  const ageDiff = childrenBirth.reduce(reducer) - mothersBirth.reduce(reducer);

  const averageAgeDiff = ageDiff / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

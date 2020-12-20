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
  let arrOfMen;

  if (arguments.length > 1) {
    arrOfMen = people.filter(men => men.sex === 'm'
    && Math.ceil(men.died / 100) === century);
  } else {
    arrOfMen = people.filter(men => men.sex === 'm');
  }

  const arrOfMenAge = arrOfMen.map(men => men.died - men.born);

  const menAverageAge = arrOfMenAge.reduce((a, b) => a + b, 0)
  / arrOfMenAge.length;

  return +menAverageAge.toFixed(2);
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
  let arrOfWoman;

  if (withChildren) {
    arrOfWoman = people.filter(woman => woman.sex === 'f'
    && people.some(child => child.mother === woman.name));
  } else {
    arrOfWoman = people.filter(woman => woman.sex === 'f');
  }

  const arrOfWomanAge = arrOfWoman.map(woman => woman.died - woman.born);

  const womanAverageAge = arrOfWomanAge.reduce((a, b) => a + b, 0)
  / arrOfWomanAge.length;

  return +womanAverageAge.toFixed(2);
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
  const arrOfMothers = people.filter(mother => mother.sex === 'f'
    && people.some(child => child.mother === mother.name));
  let arrOfChildren;

  if (onlyWithSon) {
    arrOfChildren = people.filter(son => son.sex === 'm'
      && arrOfMothers.some(mother => mother.name === son.mother));
  } else {
    arrOfChildren = people.filter(x =>
      arrOfMothers.some(child => child.name === x.mother));
  }

  const averageAge = arrOfChildren.reduce((sum, child) =>
    sum + child.born
    - arrOfMothers.find(mother => child.mother === mother.name).born, 0)
    / arrOfChildren.length;

  return +averageAge.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

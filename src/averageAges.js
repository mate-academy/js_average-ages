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
  const manAvarageAges = people
    .filter(person => person.sex === 'm')
    .filter(person => century ? Math.ceil(person.died / 100) === century : true)
    .map(person => person.died - person.born);

  if (!manAvarageAges.length) {
    return 0;
  }

  return Math.round(manAvarageAges.reduce((a, b) => a + b)
    / manAvarageAges.length * 100) / 100;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mums = people.filter(p => p.mother).map(p => p.mother);

  const womanAvarageAges = people
    .filter(person => person.sex === 'f')
    .filter(person => withChildren ? mums.includes(person.name) : true)
    .map(person => person.died - person.born);

  if (!womanAvarageAges.length) {
    return 0;
  }

  return +(womanAvarageAges.reduce((a, b) => a + b)
    / womanAvarageAges.length).toFixed(2);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const ages = people
    .filter(p => p.mother && (onlyWithSon ? p.sex === 'm' : true))
    .filter(p => people.find(m => m.name === p.mother))
    .map(person => {
      const mother = people.find(p => p.name === person.mother);

      return person.born - mother.born;
    });

  if (!ages.length) {
    return 0;
  }

  return Math.round(ages.reduce((a, b) => a + b) / ages.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

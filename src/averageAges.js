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
function average(array) {
  return array.reduce((total, number) => {
    return total + number;
  }, 0);
}

function calculateMenAverageAge(people, century) {
  const mens = century
    ? people.filter(men => Math.ceil(men.died / 100)
  === century && (men.sex === 'm'))
    : people.filter(person => person.sex === 'm');

  const ages = mens.map(men => men.died - men.born);

  const sumOfAges = average(ages);

  return sumOfAges / ages.length;
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
  const womens = withChildren
    ? people.filter(person =>
      people.some(child => person.name === child.mother))
    : people.filter((person) => person.sex === 'f');

  const ages = womens.map(women => women.died - women.born);

  const agesWomen = average(ages) / ages.length;

  return agesWomen;
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
  const children = onlyWithSon
    ? people.filter(person => people.some(child => child.name === person.mother)
    && person.sex === 'm')
    : people.filter(person =>
      people.some(child => child.name === person.mother));

  const difference = children.map(child => {
    const motherOfChild = people.find(mother => mother.name === child.mother);

    return child.born - motherOfChild.born;
  });

  const ages = difference
    .reduce((total, age) => total + age) / difference.length;

  return ages;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

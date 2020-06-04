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
  const mens = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm')
      .filter(person => Math.ceil(person.died / 100) === century);

  const mensAges = mens.map(person => person.died - person.born);

  return mensAges.reduce((prev, cur) => prev + cur, 0) / mensAges.length;
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
  const women = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter((person) => person.sex === 'f'
            && people.some(w => person.name === w.mother));

  const womenAges = women.map(w => w.died - w.born);

  return womenAges.reduce((prev, cur) => prev + cur, 0) / womenAges.length;
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
    ? people.filter(person => people
      .some(woman => person.mother === woman.name))
    : people.filter(person => people
      .some(woman => person.mother === woman.name && person.sex === 'm'));

  const ages = children.map(person => {
    const mother = people.find(woman => woman.name === person.mother);

    return person.born - mother.born;
  });

  return ages.reduce((prev, cur) => prev + cur) / children.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

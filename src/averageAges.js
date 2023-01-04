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

function averageAge(people) {
  const sumOfAges = people.reduce((accumulator, person) => (
    accumulator + (person.died - person.born)
  ), 0);

  return sumOfAges / people.length;
}

function calculateMenAverageAge(people, century) {
  const mans = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return averageAge(mans);
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
  const womans = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(man => man.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return averageAge(womans);
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
    ? people.filter(person => person.sex === 'm'
      && people.some(mum => person.mother === mum.name))
    : people.filter(person => people.some(mum => person.mother === mum.name));

  const difference = children.map(child => {
    const mother = people.find(mum => mum.name === child.mother);

    return child.born - mother.born;
  });

  const averageDifference = difference.reduce(
    (sum, age) => sum + age) / difference.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

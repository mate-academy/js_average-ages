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
  const arrOfMen = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');
  const arrOfAges = arrOfMen.map(person => person.died - person.born);
  const sumOfAges = arrOfAges.reduce((sum, age) => sum + age, 0);
  const averageAge = sumOfAges / arrOfAges.length;

  return averageAge;
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
  const arrOfWomen = withChildren
    ? people.filter(mother => mother.sex === 'f'
    && people.some(person => mother.name === person.mother))
    : people.filter(gender => gender.sex === 'f');
  const arrOfAges = arrOfWomen.map(person => person.died - person.born);
  const sumOfAges = arrOfAges.reduce((sum, age) => sum + age, 0);
  const averageAge = sumOfAges / arrOfAges.length;

  return averageAge;
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
  const arrOfChild = onlyWithSon
    ? people.filter(child => people.some(mother => mother.name === child.mother)
    && child.sex === 'm')
    : people.filter(child => people
      .some(mother => mother.name === child.mother));

  const ageDiff = arrOfChild
    .reduce((sum, children) => sum + children.born - people
      .find(mother => mother.name === children.mother).born, 0);
  const average = ageDiff / arrOfChild.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
function getAverageAge(people) {
  const personAge = people.map(person => {
    return person.died - person.born;
  });
  const averageAge = personAge.reduce((a, b) => a + b, 0) / personAge.length;

  return averageAge;
}

function calculateMenAverageAge(people, century) {
  const allMen = people.filter(person =>
    person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century));

  return getAverageAge(allMen);
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
  const allWomen = people.filter(person =>
    person.sex === 'f'
      && (!withChildren || people.some(child => child.mother === person.name)));

  return getAverageAge(allWomen);
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
  const children = people.filter(child => onlyWithSon
    ? child.sex === 'm' && people.some(mother => mother.name === child.mother)
    : people.some(mother => mother.name === child.mother));

  const averageAgeDiff = children.reduce((diff, child) => {
    const mother = people.find(person => person.name === child.mother);

    return diff + child.born - mother.born;
  }, 0);

  return averageAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

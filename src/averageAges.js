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
  const male = people
    .filter(person => person.sex === 'm'
    && (century
      ? Math.ceil(person.died / 100) === century
      : true)
    );

  const menAverageAge = male
    .map(person => person.died - person.born)
    .reduce((currentValue, age) => currentValue + age);

  return menAverageAge / male.length;
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
  const female = people
    .filter(person => person.sex === 'f'
    && (withChildren
      ? people.some(children => children.mother === person.name)
      : true)
    );

  const womenAverageAge = female
    .map(person => person.died - person.born)
    .reduce((currentValue, age) => currentValue + age);

  return womenAverageAge / female.length;
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
  const children = people
    .filter(child => child.mother !== null
    && people.some(mother => mother.name === child.mother)
    && (onlyWithSon ? child.sex === 'm' : true)
    );

  const averageAgeDiff = children
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born);

  const averageAge = averageAgeDiff.reduce((a, b) => a + b) / children.length;

  return Math.round(averageAge * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
